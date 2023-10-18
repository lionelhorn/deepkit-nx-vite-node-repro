import {sql} from "@deepkit/sql";
import {Database} from "@deepkit/orm";
import {PostgresDatabaseAdapter} from "@deepkit/postgres";
import { v4 as uuidv4 } from 'uuid';

// Don't import existing database from "@lionel/..." as importing other ... deps screws things.
export class SessionsDatabase extends Database{
	constructor() {
		const adapter = new PostgresDatabaseAdapter({
			host: 'localhost',
			port: 54433,
			database: 'next',
			user: "postgres",
			password: "root"
		});

		super(adapter, []);
		this.name = "Sessions";
	}
}

export async function getSessionWithRpcTokenFromNextSessionId(sessionId: string) {
	const db = new SessionsDatabase();

	const sessionsQuery = await db.raw(sql`SELECT * FROM sessions WHERE "sessionToken" = ${sessionId}`);
	const session = await sessionsQuery.findOneOrUndefined();

	if(!session?.rpcToken) {
		const id = uuidv4();
		const updateRpcTokenQuery = await db.raw(sql`UPDATE sessions SET "rpcToken" = ${id} WHERE "sessionToken" = ${sessionId}`);
		await updateRpcTokenQuery.execute();
	}

	const updatesSessionQuery = await db.raw(sql`SELECT * FROM sessions WHERE "sessionToken" = ${sessionId}`);
	const sessionUpdated = await updatesSessionQuery.findOneOrUndefined();

	return sessionUpdated;
}

export async function getEmailFromRpcToken(token: string) {
	const db = new SessionsDatabase();

	const sessionsQuery = await db.raw(sql`SELECT * FROM sessions WHERE "rpcToken" = ${token}`);
	const session = await sessionsQuery.findOneOrUndefined();

	if(!session) {
		return null;
	}

	const user = await db.raw(sql`SELECT * FROM users WHERE "id" = ${session.userId}`).findOneOrUndefined();
	return user?.email ?? null;
}