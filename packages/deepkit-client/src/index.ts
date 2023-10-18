import type {HttpControllerExample} from "@lionelhorn/shared";
import {RpcWebSocketClient} from "@deepkit/rpc";
export async function getUser() {
	const client = new RpcWebSocketClient('ws://localhost:8080');
	client.token.set("zzz42")
	const main = client.controller<HttpControllerExample>('/main');


	const hello = await main.helloWorld();
	console.log(hello.hello);
	return hello;
}