import {App} from '@deepkit/app';
import {FrameworkModule} from '@deepkit/framework';

import {RpcConnectedClientsService, ServerEventsListener} from "@lionelhorn/deepkit-server";

const app = new App({
	providers: [
		RpcConnectedClientsService
	],
	listeners: [
		ServerEventsListener,
	],
	imports: [
		new FrameworkModule({
			debug: true,
		})
	]
});

app.loadConfigFromEnv({prefix: 'APP_'})
	.run(["server:start"]);
