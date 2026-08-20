import { Routes } from "@/src/app/routes";
import { Button } from "@/src/common/components/shadcn/button";
import Link from "next/link";

export const Auth_Logout_Button = (p: {}) => {
	return (
		<Button
			//
			variant={"ghost"}
			render={<Link href={Routes.Logout} />}
			nativeButton={false}
		>
			{"Logout"}
		</Button>
	);
};


