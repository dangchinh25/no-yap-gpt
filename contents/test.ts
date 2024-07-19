import type { PlasmoCSConfig } from "plasmo"
import {sendToBackground} from '@plasmohq/messaging'
 
export const config: PlasmoCSConfig = {
    matches: [
        "https://www.youtube.com/watch?v=*",
    ],
    all_frames: true
}

console.log(
"This is a test content script"
)

const currentUrl = window.location.href;

sendToBackground({
    name: "ping",
    body: {
        id: 123,
        url: currentUrl
    }
    })
