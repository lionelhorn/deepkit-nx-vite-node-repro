import {rpc} from "@deepkit/rpc";
import {compare, hashSync} from "bcrypt";
import {addHours} from "date-fns";
import {http, HttpBody} from "@deepkit/http";
import {Email, MinLength} from "@deepkit/type";
import {User, UserSession} from "../models/User";
import {RequestError} from "../models/error";
import {CurrentDatabase, type SQLiteDatabase} from "../database";

interface Auth {
	username: string & MinLength<4>;
	password: string & MinLength<6>;
}

interface Register extends Auth {
	email: string & MinLength<4> & Email;
}

@http.controller("user")
@rpc.controller("user")
export class UserController {

	constructor(
		protected database: CurrentDatabase,
	) {
	}

	@rpc.action()
	hello() {
		return "hello from server";
	}

	@rpc.action()
	async getData(id: string): Promise<User | undefined> {
		if (!id) return undefined;

		const session = await this.database.query(UserSession).filter({
			id: id
		}).joinWith("user").findOneOrUndefined();
		if (!session) return undefined;

		session.user.password = "";
		return session.user;
	}

	@http.POST("/login")
	async login(body: HttpBody<Auth>): Promise<UserSession | RequestError> {
		const {username, password} = body;

		const user = await this.database.query(User).filter({
			username: username.toLowerCase()
		}).findOneOrUndefined();
		if (!user) return new RequestError("username not found", [
			{
				path: 'username',
				message: 'username not found'
			}
		]);

		if (!await compare(password, user.password)) return new RequestError("password does not match", [
			{
				path: 'password',
				message: 'password does not match'
			}
		]);

		const otherSessions = await this.database.query(UserSession).filter({user: user}).joinWith("user").find();

		if (otherSessions.length != 0) {
			await this.database.remove(...otherSessions);
		}

		const session = new UserSession();
		session.user = user;
		session.expire = addHours(new Date(), 5);

		await this.database.persist(session);
		session.user.password = "";
		return session;
	}

	@rpc.action()
	async logout(token: string): Promise<boolean> {
		const session = await this.database.query(UserSession).filter({
			id: token
		}).findOneOrUndefined();
		if (!session) return;

		await this.database.remove(session);

		return true;
	}

	@http.POST("/register")
	async register(body: HttpBody<Register>): Promise<User | RequestError> {
		const {username, password, email} = body;

		const user = await this.database.query(User).filter({
			username: username.toLowerCase()
		}).findOneOrUndefined();

		if (user) return new RequestError("user already exists", [
			{path: 'username', message: 'already exists'}
		]);

		const mail = await this.database.query(User).filter({
			email: email.toLowerCase()
		}).findOneOrUndefined();

		if (mail) return new RequestError("email already exists", [
			{path: 'email', message: 'already exists'}
		]);

		const newUser = new User(email.toLowerCase());
		newUser.email = email.toLowerCase();
		newUser.password = hashSync(password, 15);

		await this.database.persist(newUser);
		return newUser;
	}

	@rpc.action()
	async check(token: string): Promise<boolean> {
		return false;
	}
}