import type { PlasmoMessaging } from "@plasmohq/messaging"
import { YoutubeTranscript } from "youtube-transcript";

const handler: PlasmoMessaging.MessageHandler = async (req, res) => {
    const url: string = req.body.url

    const transcriptResponses = await YoutubeTranscript.fetchTranscript(
        url
      );

    console.log(transcriptResponses)
}
 
export default handler