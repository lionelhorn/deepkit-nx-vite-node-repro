import {http} from "@deepkit/http";
import {rpc} from "@deepkit/rpc";

@rpc.controller('/main')
export class HttpControllerExample {

	@http.GET('/hello')
	@rpc.action()
	async helloWorld() {
		return {hello: "world"};
	}
}