import {getUser} from "@lionelhorn/deepkit-client";

export const life = 42

window.addEventListener("message", async function (event) {
	const source = event.source as {
		window: WindowProxy
	}
	const user = await getUser();

	source.window.postMessage(user, event.origin)
})