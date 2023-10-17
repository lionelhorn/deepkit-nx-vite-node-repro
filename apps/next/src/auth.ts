import {Pool} from "pg";
import PostgresAdapter from "@auth/pg-adapter";
import Google from "next-auth/providers/google";
import type { NextAuthOptions as NextAuthConfig } from "next-auth"


const pool = new Pool({
	user: "postgres",
	host: "localhost",
	database: "next",
	password: process.env.DB_PASSWD ?? "",
	port: 54433,
	max: 20,
	idleTimeoutMillis: 30000,
	connectionTimeoutMillis: 2000
})

export const authOptions = {
	adapter: PostgresAdapter(pool),
	pages: {
		signIn: '/auth/signin',
	},
	providers: [
		Google({
			clientId: process.env.GOOGLE_ID ?? "",
			clientSecret: process.env.GOOGLE_SECRET ?? "",
		}),
	],
	callbacks: {
		async session({ session, token, user }) {
			// // Send properties to the client, like an access_token and user id from a provider.
			// session.accessToken = token.accessToken
			// session.rpc = "zzz";

			return session
		}
	}
} satisfies NextAuthConfig;
