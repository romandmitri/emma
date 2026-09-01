"use client";

import { Routes } from "@/src/app/routes";
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu } from "@/src/common/components/shadcn/sidebar";
import { BrandLogo } from "@/src/modules/branding/components/BrandLogo";
import { ThemeIcon } from "@/src/modules/branding/components/ThemeIcon";
import { AuthenticatedSidebar_Group } from "@/src/modules/layout/components/AuthenticatedSidebar_Group";
import { AuthenticatedSidebar_Link } from "@/src/modules/layout/components/AuthenticatedSidebar_Link";
import { AuthenticatedSidebar_UserMenu } from "@/src/modules/layout/components/AuthenticatedSidebar_UserMenu";
import { RootBox } from "@/src/modules/root/components/RootBox";
import { UserInClient } from "@/src/modules/user/type/User";
import Link from "next/link";

type Props = {
	user: UserInClient;
};

export const AuthenticatedSidebar = (p: Props) => {
	const user = p.user;

	return (
		<Sidebar
			//
			variant={"sidebar"}
			// collapsible={"icon"}
		>
			<SidebarHeader>
				<SidebarMenu>
					<Link href={Routes.Home}>
						<BrandLogo isWide className={"h-6 w-max"} />
					</Link>
				</SidebarMenu>
			</SidebarHeader>
			<SidebarContent>
				<AuthenticatedSidebar_Group>
					<AuthenticatedSidebar_Link href={Routes.StoryEditor} icon={ThemeIcon.Story} title={"Story Editor"} />
					<AuthenticatedSidebar_Link href={Routes.StoryUpdater} icon={ThemeIcon.Story} title={"Story Updater"} />
				</AuthenticatedSidebar_Group>
				<AuthenticatedSidebar_Group label={"Resume"}></AuthenticatedSidebar_Group>
				<div className={"flex-1"} />
				<RootBox isInset>
					<AuthenticatedSidebar_Group label={"Root"}></AuthenticatedSidebar_Group>
				</RootBox>
				<RootBox isInset>
					<AuthenticatedSidebar_Group label={"Developer"}>
						<AuthenticatedSidebar_Link href={Routes.Widget_Embed} icon={ThemeIcon.Widget} title={"Embed"} />
						<AuthenticatedSidebar_Link href={Routes.Widget_Native} icon={ThemeIcon.Widget} title={"Native"} />
						<AuthenticatedSidebar_Link href={Routes.Widget_Loader} icon={ThemeIcon.Widget} title={"Loader"} />
					</AuthenticatedSidebar_Group>
				</RootBox>
			</SidebarContent>
			<SidebarFooter>
				<AuthenticatedSidebar_UserMenu user={user} />
			</SidebarFooter>
			{/*<SidebarRail />*/}
		</Sidebar>
	);
};
