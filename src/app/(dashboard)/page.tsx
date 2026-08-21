import { Auth_Login_Button } from "@/src/modules/auth/components/Auth_Login_Button";
import { BrandLogo } from "@/src/modules/branding/components/BrandLogo";
import { AuthenticatedLayout } from "@/src/modules/layout/AuthenticatedLayout";
import { getCurrentUser } from "@/src/modules/user/service/UserService";
import { Fragment } from "react";

// REMINDER: Force cache reset when searchParams NOT used.
export const dynamic = "force-dynamic";

export default async function Page() {
	const user = await getCurrentUser();

	// TODO: reidenzon - Rework this and add some redirects.. or a homepage feel.

	return (
		<Fragment>
			{!user && (
				<div className={"flex flex-col items-center gap-4 p-12"}>
					<BrandLogo isWide className={"h-6 w-max"} />
					<p>{"Welcome to EMMA project."}</p>
					<Auth_Login_Button />
				</div>
			)}
			{user && <AuthenticatedLayout>{"HOME"}</AuthenticatedLayout>}
		</Fragment>
	);
}
