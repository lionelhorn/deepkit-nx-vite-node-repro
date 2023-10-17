import {Database} from "@deepkit/orm";
import {Config} from "./config";
import {User, UserSession} from "./models/User";
import {SQLiteDatabaseAdapter} from "@deepkit/sqlite";
import {PostgresDatabaseAdapter} from "@deepkit/postgres";

const schemas = [
	User,
	UserSession,
]

export class SQLiteDatabase extends Database {
	constructor(dbPath: Config['dbPath']) {
		super(new SQLiteDatabaseAdapter(dbPath), schemas);
	}
}

export class CurrentDatabase extends SQLiteDatabase {
	constructor(dbPath: Config['dbPath']) {
		super(dbPath);
	}
}

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
