import {Database} from "@deepkit/orm";
import {Config} from "./config";
import {User, UserSession} from "./models/User";
import {SQLiteDatabaseAdapter} from "@deepkit/sqlite";

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
