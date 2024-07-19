import { useState } from "react"

import { sendToBackground } from "@plasmohq/messaging"

import type {
  GenerateSummaryResponse,
  GenerateSummarySuccessResponse
} from "~shared/types"

function IndexPopup() {
  const [summary, setSummary] = useState<string | null>(null)

  const handleGenerateSummary = async () => {
    const tabs = await chrome.tabs.query({ active: true, currentWindow: true })
    const currentUrl = tabs[0].url

    const response: GenerateSummaryResponse = await sendToBackground({
      name: "generateSummary",
      body: {
        url: currentUrl
      }
    })

    if (response.metadata.success === true) {
      setSummary((response as GenerateSummarySuccessResponse).summary)
    }
  }

  return (
    <div
      style={{
        padding: 16
      }}>
      <h2>
        Welcome to your{" "}
        <a href="https://www.plasmo.com" target="_blank">
          Plasmo
        </a>{" "}
        Extension!
      </h2>
      <button onClick={handleGenerateSummary}>Generate summary</button>
      {summary && <p>{summary}</p>}
    </div>
  )
}

export default IndexPopup
