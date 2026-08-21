import { SidebarInset, SidebarProvider } from "@/src/common/components/shadcn/sidebar";
import { AuthenticatedHeader } from "@/src/modules/layout/components/AuthenticatedHeader";
import { AuthenticatedSidebar } from "@/src/modules/layout/components/AuthenticatedSidebar";
import { RootProvider } from "@/src/modules/root/context/RootProvider";
import { CurrentUserProvider } from "@/src/modules/user/context/CurrentUserProvider";
import { getCurrentUser } from "@/src/modules/user/service/UserService";
import { ReactNode } from "react";

type Props = {
	title?: ReactNode;
	children?: ReactNode;
};

export const AuthenticatedLayout = async (p: Props) => {
	const user = await getCurrentUser();

	// TODO: reidenzon - If missing user... should redirect to login.
	if (!user) return null;

	return (
		<CurrentUserProvider user={user.toClient()}>
			<RootProvider>
				<SidebarProvider>
					<AuthenticatedSidebar user={user.toClient()} />
					<SidebarInset>
						<main>
							<AuthenticatedHeader title={p.title} />
							{p.children}
						</main>
					</SidebarInset>
				</SidebarProvider>
			</RootProvider>
		</CurrentUserProvider>
	);
};
