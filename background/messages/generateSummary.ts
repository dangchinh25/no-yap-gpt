import OpenAI from "openai"
import { YoutubeTranscript, YoutubeTranscriptError } from "youtube-transcript"

import type { PlasmoMessaging } from "@plasmohq/messaging"

import {
  type GenerateSummaryRequest,
  type GenerateSummaryResponse
} from "~shared/types"

const handler: PlasmoMessaging.MessageHandler<
  GenerateSummaryRequest,
  GenerateSummaryResponse
> = async (req, res) => {
  const { url } = req.body

  try {
    const transcriptResponses = await YoutubeTranscript.fetchTranscript(url)

    const contents = transcriptResponses.map((chunk) => chunk.text)

    const openai = new OpenAI({
      apiKey: process.env.PLASMO_PUBLIC_OPENAI_API_KEY
    })

    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: `Act as a helpful assistant that gives detail info about Youtube video given a transcript:
                Transcripts: ${contents}`
        },
        {
          role: "user",
          content: "What is this video about?"
        }
      ]
    })

    return res.send({
      summary: response.choices[0].message.content,
      metadata: { success: true }
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
