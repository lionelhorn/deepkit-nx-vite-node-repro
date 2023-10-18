import {useEffect, useRef, useState} from "react"
// import {getUser} from "@lionelhorn/deepkit-client";
// import {HttpControllerExample} from "@lionelhorn/shared";
import {Storage} from "@plasmohq/storage";

function IndexPopup() {
	const iframeRef = useRef<HTMLIFrameElement>(null)
	const [evalRes, setEvalRes] = useState<Object | null>(null);

	useEffect(() => {
		window.addEventListener("message", (event) => {

			console.log(event);
			setEvalRes(event.data);

			// try {
			// 	chrome.runtime.sendMessage(event.data, function (response) {
			// 		console.log(`message from background: ${JSON.stringify(response)}`);
			// 		setEvalRes(response);
			// 	});
			// } catch (e) {
			// 	console.error(e);
			// }
			//
			// try {
			// 	iframeRef.current.contentWindow.addEventListener("message", function (response) {
			// 		console.log(`message from sandbox: ${JSON.stringify(response)}`);
			// 		setEvalRes(response);
			// 	});
			// } catch (e) {
			// 	console.error(e);
			// }

		})
	}, [])

	return (
		<div
			style={{
				display: "flex",
				flexDirection: "column",
				padding: 16,
				width: 500
			}}>
			<button
				onClick={async () => {
					// const msg = (controller: any) => controller.helloWorld();
					const storage = new Storage();
					const t = await storage.get("rpcToken");
					iframeRef.current.contentWindow.postMessage({token: t}, "*")
				}}>
				Trigger iframe eval
			</button>

			{/*<button*/}
			{/*	onClick={async () => {*/}
			{/*		await getUser()*/}
			{/*	}}>*/}
			{/*	Test rpc*/}
			{/*</button>*/}

			<div className="bg-gray-100">
				Eval res
				{evalRes && <div className="">
					{JSON.stringify(evalRes)}
        </div>}
			</div>


			<iframe src="sandbox.html" ref={iframeRef} style={{display: "none"}}/>
		</div>
	)
}

export default IndexPopup