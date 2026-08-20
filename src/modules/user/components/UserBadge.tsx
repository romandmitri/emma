import { UserAvatar } from "@/src/modules/user/components/UserAvatar";
import { UserInClient } from "@/src/modules/user/type/User";

type Props = {
	user: UserInClient | undefined;
};

export const UserBadge = (p: Props) => {
	const user = p.user;
	if (!user) return;

	return (
		<div className={"flex flex-row items-center gap-2"}>
			<UserAvatar user={user} />
			<div className={"flex flex-col"}>
				<div className={"truncate text-sm font-medium"}>{user.displayName}</div>
				<div className={"text-muted-foreground truncate text-xs"}>{user.email}</div>
			</div>
		</div>
	);
};
