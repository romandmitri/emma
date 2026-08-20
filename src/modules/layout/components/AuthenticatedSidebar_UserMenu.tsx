"use client";

import { Routes } from "@/src/app/routes";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/src/common/components/shadcn/dropdown-menu";
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar } from "@/src/common/components/shadcn/sidebar";
import { UserBadge } from "@/src/modules/user/components/UserBadge";
import { UserInClient } from "@/src/modules/user/type/User";
import { LucideLogOut } from "lucide-react";
import Link from "next/link";

type Props = {
	user: UserInClient;
};

export const AuthenticatedSidebar_UserMenu = (p: Props) => {
	const user = p.user;
	const sidebar = useSidebar();
	return (
		<SidebarMenu>
			<SidebarMenuItem>
				<DropdownMenu>
					<DropdownMenuTrigger
						render={
							<SidebarMenuButton variant={"default"} size={"lg"}>
								<UserBadge user={user} />
							</SidebarMenuButton>
						}
					/>
					<DropdownMenuContent align={"end"} side={sidebar.isMobile ? "bottom" : "right"}>
						<DropdownMenuGroup>
							<UserBadge user={user} />
						</DropdownMenuGroup>
						{/*<DropdownMenuSeparator />*/}
						{/*<DropdownMenuGroup>{"GROUP"}</DropdownMenuGroup>*/}
						<DropdownMenuSeparator />
						<DropdownMenuItem variant={"destructive"} render={<Link href={Routes.Logout} />}>
							<LucideLogOut />
							{"Logout"}
							{/*<Auth_Logout_Button />*/}
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</SidebarMenuItem>
		</SidebarMenu>
	);
};
