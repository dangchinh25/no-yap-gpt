import dedent from "dedent"
import OpenAI from "openai"
import { YoutubeTranscript, YoutubeTranscriptError } from "youtube-transcript"

import type { PlasmoMessaging } from "@plasmohq/messaging"

import { DEFAULT_USER_PROMPT } from "~shared/config"
import {
  type GenerateSummaryRequest,
  type GenerateSummaryResponse
} from "~shared/types"

const handler: PlasmoMessaging.PortHandler<
  GenerateSummaryRequest,
  GenerateSummaryResponse
> = async (req, res) => {
  const { url, userPrompt } = req.body
  const prompt = !!userPrompt ? userPrompt : DEFAULT_USER_PROMPT
  const openaiApiKey = process.env.PLASMO_PUBLIC_OPENAI_API_KEY

  if (!openaiApiKey) {
    return res.send({
      errors: ["OpenAI API key is not set"],
      metadata: { success: false }
    })
  }

  try {
    const transcriptResponses = await YoutubeTranscript.fetchTranscript(url)

    const contents = transcriptResponses.map((chunk) => chunk.text)

    const openai = new OpenAI({
      apiKey: process.env.PLASMO_PUBLIC_OPENAI_API_KEY
    })

    const chatCompletionStream = openai.beta.chat.completions.stream({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: dedent`
            Act as a helpful assistant that gives detail info about Youtube video given a transcript:
            Transcripts: ${contents}
          `
        },
        {
          role: "user",
          content: prompt
        }
      ],
      stream: true,
      stream_options: { include_usage: true }
    })

    chatCompletionStream.on("content", (content) => {
      res.send({
        summary: content,
        metadata: { success: true }
      })
    })

    chatCompletionStream.on("end", () => {
      res.send({
        summary: "",
        metadata: { success: true, streamEnd: true }
      })
    })
  } catch (err: unknown) {
    if (err instanceof YoutubeTranscriptError) {
      return res.send({
        errors: [err.message],
        metadata: { success: false }
      })
    }

    return res.send({
      errors: [JSON.stringify(err)],
      metadata: { success: false }
    })
  }
}

export default handler
