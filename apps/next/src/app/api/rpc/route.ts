import {NextApiRequest, NextApiResponse} from "next";
import {cookies, headers} from "next/headers";
import {getSessionWithRpcTokenFromNextSessionId} from "@lionelhorn/deepkit-server";

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

	const sessionToken = c["next-auth.session-token"];

	if (sessionToken) {
		const users = await getSessionWithRpcTokenFromNextSessionId(c["next-auth.session-token"]);
		const rpcToken = users.rpcToken;
		return Response.json({data: {rpcToken}}, {
			headers: {
				'Access-Control-Allow-Origin': '*',
				'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
				'Access-Control-Allow-Headers': 'Content-Type, Authorization',
			}
		});
	}

	return Response.json({error: "No session"}, {
		headers: {
			'Access-Control-Allow-Origin': '*',
			'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
			'Access-Control-Allow-Headers': 'Content-Type, Authorization',
		}
	})
}