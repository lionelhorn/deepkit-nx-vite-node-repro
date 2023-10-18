import {RpcComm} from "@lionelhorn/deepkit-client";
let rpc: RpcComm;

window.addEventListener("message", async function (event) {
	const source = event.source as {
		window: WindowProxy
	}

	if(!rpc){
		rpc = new RpcComm(event.data.token);
	}

	console.log("rpc", rpc)

	const user = await rpc.getUser();
	source.window.postMessage(user, event.origin)
})