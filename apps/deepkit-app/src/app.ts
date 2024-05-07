import {App} from '@deepkit/app';
import {FrameworkModule} from '@deepkit/framework';
import {
	Config,
	CORSHTTPListener, HttpControllerExample
} from "@lionelhorn/shared";
import {RpcConnectedClientsService, ServerEventsListener} from "@lionelhorn/deepkit-server";

const app = new App({
	config: Config,
	providers: [
		RpcConnectedClientsService
	],
	listeners: [
		ServerEventsListener,
		CORSHTTPListener,
	],
	controllers: [
		HttpControllerExample
	],
	middlewares: [
	],
	imports: [
		new FrameworkModule({
			debug: true,
		})
	]
});

app.loadConfigFromEnv({prefix: 'APP_'})
	.run(["server:start"]);
