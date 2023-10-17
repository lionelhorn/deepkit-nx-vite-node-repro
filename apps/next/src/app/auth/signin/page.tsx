import {UserAuthForm} from "@n/components/ui/user-auth-form"
import {getServerSession} from "next-auth/next";
import {getProviders} from "next-auth/react";
import {Metadata} from "next";
import {redirect} from "next/navigation";
import {authOptions} from "@n/auth";

export const metadata: Metadata = {
	title: "Authentication",
	description: "",
}

export default async function AuthenticationPage() {

	const session = await getServerSession(authOptions);

	// If the user is already logged in, redirect.
	// Note: Make sure not to redirect to the same page
	// To avoid an infinite loop!
	if (session) {
		redirect("/dashboard");
	}

	const providers = await getProviders();


	return (
		<>
			<div
				className="container relative min-h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
				<div className="relative h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
					<div className="absolute inset-0 bg-zinc-900"/>
					<div className="relative z-20 flex items-center text-lg font-medium">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							strokeWidth="2"
							strokeLinecap="round"
							strokeLinejoin="round"
							className="mr-2 h-6 w-6"
						>
							<path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3"/>
						</svg>
						Aero tools
					</div>
				</div>
				<div className="lg:p-8">
					<div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
						{	/* @ts-ignore */}
						<UserAuthForm providers={providers}/>
					</div>
				</div>
			</div>
		</>
	)
}
