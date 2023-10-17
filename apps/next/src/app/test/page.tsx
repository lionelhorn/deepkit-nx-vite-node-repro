import {typeOf} from "@deepkit/type";

class UserSession {
	id: string
	user!: string
	created: Date = new Date();
}

export default async function Index() {
	console.log("typeOf", typeOf<UserSession>())
	return <div></div>
}