import type {HttpControllerExample} from "@lionelhorn/shared";
import {RpcWebSocketClient} from "@deepkit/rpc";

export class RpcComm {
	client: RpcWebSocketClient

	constructor(public token: string) {
		this.initClient();
	}

	initClient() {
		console.log(`Init client with ${this.token}`);
		this.client = new RpcWebSocketClient('ws://localhost:8080');
		this.client.token.set(this.token)
		console.log(this.client);
	}

	async getUser() {
		const main = this.client.controller<HttpControllerExample>('/main');
		console.log("controller", main);
		const hello = await main.helloWorld();
		console.log(hello.hello);
		return hello;
	}
}