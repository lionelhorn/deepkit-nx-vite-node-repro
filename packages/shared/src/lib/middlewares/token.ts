import {HttpMiddleware, HttpNotFoundError, HttpRequest, HttpResponse} from "@deepkit/http";
import {RpcControllerAccess, RpcKernelSecurity, Session} from "@deepkit/rpc";
import {CurrentDatabase, SessionsDatabase, UserSession} from "@lionelhorn/shared";
import {sql} from "@deepkit/sql";
import {getEmailFromRpcToken} from "@lionelhorn/deepkit-server";

export class TokenChecker implements HttpMiddleware {
	allowedURLs: string[] = [
		"/user/login",
		"/user/register"
	]

	constructor(protected database: CurrentDatabase) {
	}

	async execute(request: HttpRequest, response: HttpResponse, next: (err?: any) => void) {
		if (!this.allowedURLs.includes(request.getUrl())) {
			if (request.body) {
				// @ts-ignore
				const bodyToken = request.body.token;

				const token = await this.database.query(UserSession).filter({
					id: bodyToken
				}).findOneOrUndefined();
				if (!token) throw new HttpNotFoundError("token invalid");
			}
		}

		next();
	}
}

export class RPCSecurity extends RpcKernelSecurity {

	constructor(protected database: CurrentDatabase, protected sessionsDb: SessionsDatabase) {
		super();
	}

	async hasControllerAccess(session: Session, controllerAccess: RpcControllerAccess): Promise<boolean> {
		if(!session) return false;

		console.log('hasControllerAccess', session.token, session.username, controllerAccess.controllerName, controllerAccess.actionName);

		const z = await this.sessionsDb.raw(sql`SELECT * FROM users`);
		const ze = await z.find();
		return true;
	}

	async isAllowedToRegisterAsPeer(session: Session, peerId: string): Promise<boolean> {
		if(!session) return false;

		console.log('isAllowedToRegisterAsPeer')
		return true;
	}

	async isAllowedToSendToPeer(session: Session, peerId: string): Promise<boolean> {
		if(!session) return false;

		const userSession = await this.database.query(UserSession).filter({
			id: session.token
		}).joinWith("user").findOneOrUndefined();

		if (!userSession) return false;
		console.log('isAllowedToSendToPeer:', session.token, userSession.user.username);
		return true;
	}

	async authenticate(token: string): Promise<Session> {
		const email = await getEmailFromRpcToken(token);
		if (!email) return undefined;

		console.log('authenticated:', token, 'with:', email);

		return new Session(email, token);
	}

	transformError(err: Error) {
		console.log('transformError')
		return err;
	}
}
