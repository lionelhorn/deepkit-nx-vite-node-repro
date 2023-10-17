"use client";
import {ClientSafeProvider, signIn, signOut} from "next-auth/react";
import {FC, PropsWithChildren} from "react";
import * as React from "react";

export const SignInClient: FC<{ provider: ClientSafeProvider }> = ({provider}) => <div
	onClick={() => signIn(provider.id)}
>
	{provider.name}
</div>

export const SignOutClient: FC<PropsWithChildren> = ({children}) => <button
	onClick={async () => {
		await signOut()
	}}
>
	Log out
</button>