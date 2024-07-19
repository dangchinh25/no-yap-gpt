import { useState } from "react"

import "./style.css"

//@ts-ignore
import PopNemo from "assets/popnemo-yap.gif"
import { TailSpin } from "react-loader-spinner"

import { sendToBackground } from "@plasmohq/messaging"

import { DEFAULT_USER_PROMPT } from "~shared/config"
import type {
  GenerateSummaryErrorResponse,
  GenerateSummaryRequest,
  GenerateSummaryResponse,
  GenerateSummarySuccessResponse
} from "~shared/types"

function IndexPopup() {
  const [summary, setSummary] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [userPrompt, setUserPrompt] = useState<string>(DEFAULT_USER_PROMPT)

  const handleGenerateSummary = async () => {
    setIsLoading(true)

    const tabs = await chrome.tabs.query({ active: true, currentWindow: true })
    const currentUrl = tabs[0].url

    const response: GenerateSummaryResponse =
      await sendToBackground<GenerateSummaryRequest>({
        name: "generateSummary",
        body: {
          url: currentUrl,
          userPrompt
        }
      })

    if (response.metadata.success === true) {
      setSummary((response as GenerateSummarySuccessResponse).summary)
    } else {
      setSummary(
        `An error occurred while generating the summary. Errors: ${JSON.stringify((response as GenerateSummaryErrorResponse).errors)}`
      )
    }
    setIsLoading(false)
  }

  return (
    <div className="w-96 p-4 flex flex-col">
      <div className="flex items-center justify-center">
        <h1 className="text-2xl font-normal h-10 mr-2">Stop Yapping</h1>
        <img src={PopNemo} className="h-10" />
      </div>
      <input
        className="bg-slate-200 mt-2 rounded p-2"
        placeholder={`Enter your prompt here (Default to '${DEFAULT_USER_PROMPT}')`}
        value={userPrompt}
        onChange={(e) => setUserPrompt(e.target.value)}
      />

      {!isLoading && (
        <button
          className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          onClick={handleGenerateSummary}>
          Generate summary
        </button>
      )}
      {isLoading && (
        <div className="flex justify-center mt-2">
          <TailSpin height={50} width={50} color="#c4c5c7" />
        </div>
      )}
      {summary && !isLoading && (
        <div className="whitespace-pre-wrap mt-2">
          <p>{summary}</p>
        </div>
      )}
    </div>
  )
}

export default IndexPopup
