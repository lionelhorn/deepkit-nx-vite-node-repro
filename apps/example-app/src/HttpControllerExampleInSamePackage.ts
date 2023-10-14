import {http} from "@deepkit/http";

export class HttpControllerExampleInSamePackage {

	@http.GET('/same')
	async helloWorldSame() {
		return "world";
	}
}
