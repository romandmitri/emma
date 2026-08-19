import { cn } from "@/src/common/components/cn";
import { SignOutButton } from "@/src/modules/auth/components/SignOutButton";
import Image from "next/image";

export interface Props {
	user: {
		id?: string;
		name?: string | null;
		email?: string | null;
		image?: string | null;
	};
	className?: string;
}

// TODO: reidenzon - Clean up this AI slop!
export function UserNav({ user, className }: Props) {
	const displayName = user.name || user.email?.split("@")[0] || "User";
	const initials = displayName
		.split(" ")
		.map((part) => part[0])
		.slice(0, 2)
		.join("")
		.toUpperCase();

	return (
		<div className={cn("border-border bg-card/60 flex items-center gap-3 rounded-lg border p-2", className)}>
			{user.image ? (
				<Image src={user.image} alt={displayName} width={32} height={32} className="border-border h-8 w-8 rounded-full border object-cover" />
			) : (
				<div className="bg-primary text-primary-foreground flex h-8 w-8 items-center justify-center rounded-full text-xs font-semibold">{initials}</div>
			)}
			<div className="flex min-w-0 flex-1 flex-col">
				<span className="text-foreground truncate text-xs font-medium">{displayName}</span>
				{user.email && <span className="text-muted-foreground truncate text-[11px]">{user.email}</span>}
			</div>
			<SignOutButton />
		</div>
	);
}
