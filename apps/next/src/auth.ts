import {Pool} from "pg";
import PostgresAdapter from "@auth/pg-adapter";
import Google from "next-auth/providers/google";
import type {NextAuthOptions as NextAuthConfig} from "next-auth"


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
	// session: {
	// 	// Choose how you want to save the user session.
	// 	// The default is `"jwt"`, an encrypted JWT (JWE) stored in the session cookie.
	// 	// If you use an `adapter` however, we default it to `"database"` instead.
	// 	// You can still force a JWT session by explicitly defining `"jwt"`.
	// 	// When using `"database"`, the session cookie will only contain a `sessionToken` value,
	// 	// which is used to look up the session in the database.
	// 	strategy: "jwt",
	//
	// 	// Seconds - How long until an idle session expires and is no longer valid.
	// 	maxAge: 30 * 24 * 60 * 60, // 30 days
	//
	// 	// Seconds - Throttle how frequently to write to database to extend a session.
	// 	// Use it to limit write operations. Set to 0 to always update the database.
	// 	// Note: This option is ignored if using JSON Web Tokens
	// 	updateAge: 24 * 60 * 60, // 24 hours
	// },
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
		async signIn({user, account, profile, email, credentials}) {
			console.log(user);
			return true;
		},
		async session({session, token, user, ...rest}) {
			// // Send properties to the client, like an access_token and user id from a provider.
			// session.accessToken = token.accessToken
			session["rpc"] = "zzz";

			return session
		},
		async jwt({token, account, profile}) {
			// Persist the OAuth access_token and or the user id to the token right after signin
			if (account) {
				// token.accessToken = account.access_token
				// token.id = profile.id
				token.rpc = "zzz42"
			}
			return token
		}
	}
} satisfies NextAuthConfig;
