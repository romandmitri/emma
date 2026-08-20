import { Routes } from "@/src/app/routes";
import { Button } from "@/src/common/components/shadcn/button";
import Link from "next/link";

export const Auth_Login_Button = (p: {}) => {
	return (
		<Button
			//
			variant={"outline"}
			render={<Link href={Routes.Login} />}
			nativeButton={false}
		>
			{"Login"}
		</Button>
	);
};

