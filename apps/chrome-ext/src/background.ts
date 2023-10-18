import {Storage} from "@plasmohq/storage"
import {getUser} from "@lionelhorn/deepkit-client";

/*****************************************************************
 * onMessage from the extension or tab (a content script)
 *****************************************************************/
chrome.runtime.onMessage.addListener(
	function (request, sender, sendResponse) {
		console.log(request);

		// Note: Returning true is required here!
		//  ref: http://stackoverflow.com/questions/20077487/chrome-extension-message-passing-response-not-sent
		return true;
	});

/**
 * From webpage allowed to send messages to extension (externally_connectable in manifest)
 */
chrome.runtime.onMessageExternal.addListener((request, sender, sendResponse) => {
	console.log(`BG: Received message from ${sender}:`, request);

	if (request.type === "rpcToken") {
		const storage = new Storage()
		storage.set("rpcToken", request.rpcToken).then(() => {
		});
		console.log("Token stored");
		sendResponse({received: true, from: sender, request});
	}
	//
	// if (request.type === "getUser") {
	// 	return new Promise((resolve) => {
	// 		(async () => {
	// 			// await getUser()
	// 			// const client = await import("@lionelhorn/deepkit-client");
	// 			// const r = await client.getUser();
	// 			// console.log("bg rpc", r);
	// 			// resolve();
	// 		})();
	// 	})
	// }
});

chrome.runtime.onInstalled.addListener((details) => {
	try {
		// (async () => {
		// 	const z = await import("@lionelhorn/deepkit-client")
		// })()
		return true
	} catch (e) {
		console.error(e)
	}
});