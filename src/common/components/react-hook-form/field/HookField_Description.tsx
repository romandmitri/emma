import { FieldDescription } from "@/src/common/components/shadcn/field";
import { ReactNode } from "react";

type Props = {
	children?: ReactNode;
};

export const HookField_Description = (p: Props) => {
	if (!p.children) return null;
	return <FieldDescription>{p.children}</FieldDescription>;
};
