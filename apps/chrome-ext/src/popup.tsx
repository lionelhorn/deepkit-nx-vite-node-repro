import {useEffect, useRef, useState} from "react"

function IndexPopup() {
	const iframeRef = useRef<HTMLIFrameElement>(null)

	useEffect(() => {
		window.addEventListener("message", (event) => {
			console.log("EVAL output: " + event.data)

			try {
				chrome.runtime.sendMessage(event.data, function (response) {
					console.log(`messagezzz from background: ${JSON.stringify(response)}`);
				});
			} catch (e) {
				console.error(e);
			}

		})
	}, [])

	return (
		<div
			style={{
				display: "flex",
				flexDirection: "column",
				padding: 16
			}}>
			<button
				onClick={() => {
					iframeRef.current.contentWindow.postMessage("10 + 20", "*")
				}}>
				Trigger iframe eval
			</button>
			<iframe src="sandbox.html" ref={iframeRef} style={{display: "none"}}/>
		</div>
	)
}

export default IndexPopup