import {
	Avatar,
	AvatarFallback,
	AvatarImage,
} from "@n/components/ui/avatar"
import {Button} from "@n/components/ui/button"
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuShortcut,
	DropdownMenuTrigger,
} from "@n/components/ui/dropdown-menu"
import {getServerSession} from "next-auth/next";
import {SignOutClient} from "@n/components/ui/auth-client";
import {authOptions} from "@n/auth";

export async function UserNav() {
	const session = await getServerSession(authOptions);

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="ghost" className="relative h-8 w-8 rounded-full">
					<Avatar className="h-8 w-8">
						<AvatarImage src={(session && session?.user?.image) ? session?.user?.image : "/avatars/01.png"}
						             alt={`${session && session?.user?.name}`}/>
						<AvatarFallback>{session && session?.user?.name}</AvatarFallback>
					</Avatar>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className="w-56" align="end" forceMount>
				<DropdownMenuLabel className="font-normal">
					<div className="flex flex-col space-y-1">
						<p className="text-sm font-medium leading-none"> {session && session?.user?.name}</p>
						<p className="text-xs leading-none text-muted-foreground">
							{session && session?.user?.email}
						</p>
					</div>
				</DropdownMenuLabel>
				<DropdownMenuSeparator/>
				<DropdownMenuGroup>
					<DropdownMenuItem>
						Profile
						<DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
					</DropdownMenuItem>
					<DropdownMenuItem>
						Billing
						<DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
					</DropdownMenuItem>
					<DropdownMenuItem>
						Settings
						<DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
					</DropdownMenuItem>
					<DropdownMenuItem>New Team</DropdownMenuItem>
				</DropdownMenuGroup>
				<DropdownMenuSeparator/>
				<DropdownMenuItem>
					<SignOutClient>
						Logz out
					</SignOutClient>
					<DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}
