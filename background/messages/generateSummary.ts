import OpenAI from "openai"
import { YoutubeTranscript } from "youtube-transcript"

import type { PlasmoMessaging } from "@plasmohq/messaging"

import {
  GenerateSummaryRequestSchema,
  type GenerateSummaryRequest,
  type GenerateSummaryResponse
} from "~shared/types"

const handler: PlasmoMessaging.MessageHandler<
  GenerateSummaryRequest,
  GenerateSummaryResponse
> = async (req, res) => {
  const parseResult = GenerateSummaryRequestSchema.safeParse(req.body)

  if (!parseResult.success) {
    return res.send({ errors: parseResult.error.errors })
  }

  const { url } = parseResult.data

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

  return res.send({ summary: response.choices[0].message.content })
}

export default handler
