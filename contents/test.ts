import type { PlasmoCSConfig } from "plasmo"
 
export const config: PlasmoCSConfig = {
    matches: [
        "https://www.plasmo.com/*",
        "https://docs.plasmo.com/*",
        "https://www.youtube.com/watch?v=*",
    ],
    all_frames: true
}

console.log(
"This is a test content script"
)