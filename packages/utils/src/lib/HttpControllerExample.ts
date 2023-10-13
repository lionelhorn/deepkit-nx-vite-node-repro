import {http} from "@deepkit/http";

export class HttpControllerExample {

	@http.GET('/hello')
	async helloWorld() {
		return "world";
	}
}

