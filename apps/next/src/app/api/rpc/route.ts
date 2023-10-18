import {NextApiRequest, NextApiResponse} from "next";
import {cookies, headers} from "next/headers";
import {getSessionWithRpcTokenFromSessionId} from "@lionelhorn/deepkit-server";

export async function GET(
	req: NextApiRequest,
	res: NextApiResponse<any>
) {

	const h = Object.fromEntries(headers());
	const
		c = Object.fromEntries(
			cookies()
				.getAll()
				.map((c) => [c.name, c.value]));


	const users = await getSessionWithRpcTokenFromSessionId(c["next-auth.session-token"]);
	const rpcToken = users.rpcToken;
	return Response.json({ rpcToken })
}