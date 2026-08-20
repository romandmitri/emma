"use client";

import { cn, HtmlClassName } from "@/src/common/components/cn";
import { RootAccess } from "@/src/modules/root/components/RootAccess";
import { useRoot } from "@/src/modules/root/context/RootProvider";
import { ReactNode } from "react";

type Props = {
	children?: ReactNode;
	className?: HtmlClassName;
	isInset?: boolean;
	isOutset?: boolean;
	isPad?: boolean;
};

export const RootBox = (p: Props) => {
	// TODO: reidenzon - Implement live toggle!
	const r = useRoot();

	return (
		<RootAccess>
			<div
				className={cn(
					//
					"outline-destructive/50 outline-2",
					"-outline-offset-2",
					{ "-outline-offset-4": p.isInset },
					{ "outline-offset-4": p.isOutset },
					{ "p-1": p.isPad },
					p.className,
				)}
			>
				{p.children}
			</div>
		</RootAccess>
	);
};
