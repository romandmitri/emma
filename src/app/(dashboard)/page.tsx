import { auth } from "@/src/modules/auth/auth";
import { Auth_Login_Button } from "@/src/modules/auth/components/Auth_Login_Button";
import { AuthenticatedLayout } from "@/src/modules/layout/AuthenticatedLayout";
import { getCurrentUser } from "@/src/modules/user/service/UserService";
import { Fragment } from "react";

// REMINDER: Force cache reset when searchParams NOT used.
export const dynamic = "force-dynamic";

export default async function Page() {
	const session = await auth();

	const user = await getCurrentUser();

	// TODO: reidenzon - Rework this and add some redirects.. or a homepage feel.

	return (
		<Fragment>
			{!user && (
				<div>
					<Auth_Login_Button />
				</div>
			)}
			{user && <AuthenticatedLayout />}
		</Fragment>
	);
}
