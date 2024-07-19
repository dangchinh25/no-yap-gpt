import OpenAI from "openai"
import { YoutubeTranscript } from "youtube-transcript"

import type { PlasmoMessaging } from "@plasmohq/messaging"

const handler: PlasmoMessaging.MessageHandler = async (req, res) => {
  const url: string = req.body.url

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
