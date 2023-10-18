import {getServerSession} from "next-auth/next";
import {Metadata} from "next";
import {redirect} from "next/navigation";
import {authOptions} from "@n/auth";
import {cookies, headers} from "next/headers";
import {getSessionWithRpcTokenFromNextSessionId} from "@lionelhorn/deepkit-server";
import {ExtMessage} from "@n/components/ui/ext-message";

export const metadata: Metadata = {
	title: "Authentication",
	description: "",
}

export default async function SendRpcTokenToExtension() {
	const session = await getServerSession(authOptions);

	// If the user is already logged in, redirect.
	// Note: Make sure not to redirect to the same page
	// To avoid an infinite loop!
	if (!session) {
		redirect("/auth/signin");
	}

	let rpcToken = null;

	const h = Object.fromEntries(headers());
	const
		c = Object.fromEntries(
			cookies()
				.getAll()
				.map((c) => [c.name, c.value]));

	const sessionTokenCookie = c["next-auth.session-token"];

	if (sessionTokenCookie) {
		const users = await getSessionWithRpcTokenFromNextSessionId(c["next-auth.session-token"]);
		rpcToken = users.rpcToken;
	}

	return (
		<div>
			{rpcToken && <ExtMessage message={{type: "rpcToken", rpcToken: rpcToken}}/>}
			<ExtMessage message={{type: "getUser"}}/>
		</div>
	)
}
