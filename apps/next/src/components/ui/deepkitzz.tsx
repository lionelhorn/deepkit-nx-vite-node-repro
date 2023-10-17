"use client";

import {typeOf} from "@deepkit/type";

export class UserSession {
	id: string
	user!: string
	expire!: Date;
	created: Date = new Date();
}

export const DeepkitView = () => {
	console.log("zzz1", typeOf<UserSession>())
	return <div></div>
}