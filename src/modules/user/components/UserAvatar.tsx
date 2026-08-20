import { Avatar, AvatarFallback } from "@/src/common/components/shadcn/avatar";
import { UserInClient } from "@/src/modules/user/type/User";

type Props = {
	user: UserInClient;
};

export const UserAvatar = (p: Props) => {
	const user = p.user;
	if (!user) return;

	return (
		<div>
			<Avatar>
				<AvatarFallback>{user.displayInitials}</AvatarFallback>
			</Avatar>
		</div>
	);
};
