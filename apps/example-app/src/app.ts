import {ApiConsoleModule} from '@deepkit/api-console-module';
import {App} from '@deepkit/app';
import {FrameworkModule, onServerMainBootstrapDone} from '@deepkit/framework';
import {LoggerInterface} from "@deepkit/logger";
import {eventDispatcher} from "@deepkit/event";
import {HttpControllerExample} from "@lionelhorn/utils";

class Bootstrap {
	constructor(private logger: LoggerInterface) {
	}

	@eventDispatcher.listen(onServerMainBootstrapDone)
	onMainBoostrap() {
		this.logger.log('onServerMainBootstrapDone: onMainBoostrap');
	}
}


const app = new App({
	providers: [],
	listeners: [Bootstrap],
	controllers: [HttpControllerExample],
	imports: [
		new FrameworkModule({debug: true}),
		new ApiConsoleModule({
			path: '/api'
		}),
	]
});


app.loadConfigFromEnv({prefix: 'APP_'})
	.run(["server:start"]);