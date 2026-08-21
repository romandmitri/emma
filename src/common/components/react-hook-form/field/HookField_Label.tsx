import { HookFieldName } from "@/src/common/components/react-hook-form/field/HookFieldName";
import { Badge } from "@/src/common/components/shadcn/badge";
import { FieldLabel } from "@/src/common/components/shadcn/field";
import { ReactNode } from "react";

type Props = {
	children?: ReactNode;
	for?: HookFieldName;
	isOptional?: boolean;
};

export const HookField_Label = (p: Props) => {
	if (!p.children && !p.isOptional) return null;
	return (
		<FieldLabel htmlFor={p.for} className={"items-start"}>
			<span>{p.children}</span>
			{p.isOptional && <Badge variant={"ghost"}>{"optional"}</Badge>}
		</FieldLabel>
	);
};
