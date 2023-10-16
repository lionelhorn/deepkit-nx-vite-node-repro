import {AutoIncrement, BackReference, entity, PrimaryKey, Reference, Unique, uuid, UUID} from "@deepkit/type";

@entity.name('user_sessions')
export class UserSession {
	id: UUID & PrimaryKey = uuid();

	user!: User & Reference;

	expire!: Date;
	created: Date = new Date();
}

export enum Roles {
	User, ClubManager, ServerAdmin
}

export class Club {
	id: number & PrimaryKey & AutoIncrement = 0;
}

export class ACL {
	id: number & PrimaryKey & AutoIncrement = 0;
	entity: string; //whatever you have
	write: boolean = false;
	read: boolean = false;
	delete: boolean = false;
	constructor(public user: User & Reference, public club: Club & Reference){}
}

@entity.name('users')
export class User {
	id: number & PrimaryKey & AutoIncrement = 0;
	roles: Roles[];
	acl: ACL[] & BackReference;
	password!: string;
	username!: string;

	constructor(public email: string & Unique){ }
}