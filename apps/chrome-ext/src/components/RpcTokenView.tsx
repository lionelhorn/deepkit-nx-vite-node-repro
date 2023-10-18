import {useEffect, useState} from "react";
import {Storage} from "@plasmohq/storage";

export const RpcTokenView = () => {
	const [token, setToken] = useState<string | null>(null);

	useEffect(() => {
		(async () => {
			const storage = new Storage()
			const token = await storage.get("rpcToken");
			setToken(token);
		})()
	}, [])

	return (
		<div>
			{token && <div>Token: {token}</div>}
		</div>
	)
}