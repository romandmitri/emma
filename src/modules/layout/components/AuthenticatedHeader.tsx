import { cn } from "@/src/common/components/cn";
import { SidebarTrigger } from "@/src/common/components/shadcn/sidebar";
import { ReactNode } from "react";

type Props = {
	title?: ReactNode;
};

export const AuthenticatedHeader = (p: Props) => {
	return (
		<header
			className={cn(
				// "sticky top-0"
				"flex flex-row items-center",
			)}
		>
			<SidebarTrigger />
			{p.title && <div className={""}>{p.title}</div>}
		</header>
	);
};
