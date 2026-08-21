import { HtmlClassName } from "@/src/common/components/cn";
import { HookField_Error } from "@/src/common/components/react-hook-form/field/HookField_Error";
import { HookField_Header } from "@/src/common/components/react-hook-form/field/HookField_Header";
import { HookFieldName } from "@/src/common/components/react-hook-form/field/HookFieldName";
import { Field } from "@/src/common/components/shadcn/field";
import { ReactNode } from "react";

type Props = {
	children?: ReactNode;
	className?: HtmlClassName;
	isOptional?: boolean;
	label?: ReactNode;
	description?: ReactNode;
	name: HookFieldName;
};

export const HookField = (p: Props) => {
	return (
		<Field>
			<HookField_Header
				//
				isOptional={p.isOptional}
				name={p.name}
				label={p.label}
				description={p.description}
			/>
			<div>{p.children}</div>
			<HookField_Error name={p.name} />
		</Field>
	);
};
