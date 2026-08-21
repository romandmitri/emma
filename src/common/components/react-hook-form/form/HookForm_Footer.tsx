import { cn, HtmlClassName } from "@/src/common/components/cn";
import { HookForm_Dirty } from "@/src/common/components/react-hook-form/form/HookForm_Dirty";
import { ReactNode } from "react";

type Props = {
	className?: HtmlClassName;
	children?: ReactNode;
	isDirtyWarning?: boolean;
};

export const HookForm_Footer = (p: Props) => {
	return (
		<div className={cn("flex items-center justify-end space-x-4", p.className)}>
			<HookForm_Dirty isWarning={p.isDirtyWarning} />
			{p.children}
		</div>
	);
};
