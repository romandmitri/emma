import { cn } from "@/src/common/components/cn";
import { Auth_Logout_Button } from "@/src/modules/auth/components/Auth_Logout_Button";
import { getCurrentUser } from "@/src/modules/user/service/UserService";

type Props = {};

export const UserNav = async (p: Props) => {
	const user = await getCurrentUser();
	if (!user) return;
	const displayName = user.getDisplayName();
	const initials = user.getDisplayInitials();

	// TODO: reidenzon - Clean up this AI slop!

	return (
		<div className={cn("border-border bg-card/60 flex items-center gap-3 rounded-lg border p-2")}>
			<div className="bg-primary text-primary-foreground flex h-8 w-8 items-center justify-center rounded-full text-xs font-semibold">{initials}</div>
			<div className="flex min-w-0 flex-1 flex-col">
				<span className="text-foreground truncate text-xs font-medium">{displayName}</span>
				{user.email && <span className="text-muted-foreground truncate text-[11px]">{user.email}</span>}
			</div>
			<Auth_Logout_Button />
		</div>
	);
};
