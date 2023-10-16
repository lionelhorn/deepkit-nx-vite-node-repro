import {App} from '@deepkit/app';
import {FrameworkModule, onServerMainBootstrapDone} from '@deepkit/framework';
import {LoggerInterface} from "@deepkit/logger";
import {eventDispatcher} from "@deepkit/event";
import {
	Config,
	CORSHTTPListener, CurrentDatabase, RPCSecurity, TokenChecker, UserController,
} from "@lionelhorn/shared";
import {ApiConsoleModule} from "@deepkit/api-console-module";
import {mkdir} from "node:fs/promises";
import {RpcKernelSecurity} from "@deepkit/rpc";
import {httpMiddleware} from "@deepkit/http";

class Bootstrap {
	constructor(private database: CurrentDatabase, private logger: LoggerInterface) {
	}

	@eventDispatcher.listen(onServerMainBootstrapDone)
	async onMainBoostrap() {
		await mkdir("./tmp/", {recursive: true});
		this.logger.log('onServerMainBootstrapDone: onMainBoostrap');
	}
}

const app = new App({
	config: Config,
	providers: [
		CurrentDatabase,
		{provide: RpcKernelSecurity, useClass: RPCSecurity, scope: 'rpc'},
		TokenChecker,
		RPCSecurity
	],
	listeners: [
		Bootstrap,
		CORSHTTPListener,
	],
	controllers: [
		UserController
	],
	middlewares: [
		httpMiddleware.for(TokenChecker),
	],
	imports: [
		new FrameworkModule({
			debug: true,
			migrateOnStartup: true,
		})
	]
});

app.loadConfigFromEnv({prefix: 'APP_'})
	.run(["server:start"]);