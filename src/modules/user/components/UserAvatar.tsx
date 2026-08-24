import { Avatar, AvatarFallback } from "@/src/common/components/shadcn/avatar";
import { EmotionType } from "@/src/modules/emotion/type/EmotionType";
import { UserInClient } from "@/src/modules/user/type/User";
import { ComponentProps } from "react";

type Props = {
	user: UserInClient;
	size?: ComponentProps<typeof Avatar>["size"];
	emotion?: EmotionType;
};

export const UserAvatar = (p: Props) => {
	const user = p.user;
	if (!user) return;

	// TODO: reidenzon - Add AvatarImage here! (use Emotion)
	const emotion = p.emotion ?? EmotionType.Neutral;

	return (
		<Avatar size={p.size}>
			<AvatarFallback>{user.displayInitials}</AvatarFallback>
		</Avatar>
	);
};
