import {httpWorkflow, JSONResponse} from "@deepkit/http";
import {eventDispatcher} from "@deepkit/event";

export class CORSHTTPListener {

	constructor() {
	}

	@eventDispatcher.listen(httpWorkflow.onResponse)
	onController(event: typeof httpWorkflow.onResponse.event) {
		event.response.setHeader('Access-Control-Allow-Origin', '*');
		event.response.setHeader('Access-Control-Allow-Methods', 'POST, GET');
		event.response.setHeader('Access-Control-Max-Age', '3600');
		event.response.setHeader('Access-Control-Allow-Credentials', 'true');
		event.response.setHeader('Access-Control-Allow-Headers', 'Content-Type');
		event.response.setHeader('Access-Control-Expose-Headers', 'Accept-Ranges, Content-Encoding, Content-Length, Content-Range');

		event.clearNext();
	}

	@eventDispatcher.listen(httpWorkflow.onRouteNotFound)
	onRouteNotFound(event: typeof httpWorkflow.onRouteNotFound.event) {
		if (event.request.method === 'OPTIONS') event.send(new JSONResponse(true, 200));
	}
}