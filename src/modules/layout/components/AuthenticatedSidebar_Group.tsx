import { SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu } from "@/src/common/components/shadcn/sidebar";
import { ReactNode } from "react";

type Props = {
	label?: ReactNode;
	children?: ReactNode;
};

export const AuthenticatedSidebar_Group = (p: Props) => {
	return (
		<SidebarGroup>
			{p.label && <SidebarGroupLabel>{p.label}</SidebarGroupLabel>}
			<SidebarGroupContent>
				<SidebarMenu>{p.children}</SidebarMenu>
			</SidebarGroupContent>
		</SidebarGroup>
	);
};
