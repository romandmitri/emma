"use client";

import { SidebarMenuButton, SidebarMenuItem } from "@/src/common/components/shadcn/sidebar";
import { LucideIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

type Props = {
	href: string;
	icon?: LucideIcon;
	title?: string;
};

export const AuthenticatedSidebar_Link = (p: Props) => {
	const pathname = usePathname();
	const isActive = pathname.startsWith(p.href);

	return (
		<SidebarMenuItem>
			<SidebarMenuButton
				//
				isActive={isActive}
				render={<Link href={p.href} />}
			>
				{p.icon && <p.icon className={""} />}
				<span>{p.title}</span>
			</SidebarMenuButton>
		</SidebarMenuItem>
	);
};
