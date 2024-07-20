import { useEffect, useState } from "react"

import "./style.css"

//@ts-ignore
import PopNemo from "assets/popnemo-yap.gif"
import { TailSpin } from "react-loader-spinner"

import { usePort } from "@plasmohq/messaging/hook"

import { DEFAULT_USER_PROMPT } from "~shared/config"
import type {
  GenerateSummaryErrorResponse,
  GenerateSummarySuccessResponse
} from "~shared/types"

function IndexPopup() {
  const [summary, setSummary] = useState<string>("")
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [userPrompt, setUserPrompt] = useState<string>(DEFAULT_USER_PROMPT)
  const { data, send: sendGenerateSummaryMsg } = usePort("generateSummary")
  const [streaming, setStreaming] = useState<boolean>(false)

  useEffect(() => {
    if (!data) return

    if (data.metadata.success === true) {
      setSummary(summary + (data as GenerateSummarySuccessResponse).summary)

      if (summary.length > 0) {
        setIsLoading(false)
        setStreaming(true)
      }

      if (!!(data as GenerateSummarySuccessResponse).metadata.streamEnd) {
        setStreaming(false)
      }
    } else {
      setSummary(
        summary +
          `An error occurred while generating the summary. Errors: ${JSON.stringify((data as GenerateSummaryErrorResponse).errors)}`
      )
    }
  }, [data])

  const handleGenerateSummary = async () => {
    setSummary("")
    setIsLoading(true)

    const tabs = await chrome.tabs.query({ active: true, currentWindow: true })
    const currentUrl = tabs[0].url

    sendGenerateSummaryMsg({
      url: currentUrl,
      userPrompt
    })
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
          className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={handleGenerateSummary}
          disabled={streaming}>
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
