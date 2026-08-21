import { HookField_Description } from "@/src/common/components/react-hook-form/field/HookField_Description";
import { HookField_Label } from "@/src/common/components/react-hook-form/field/HookField_Label";
import { HookFieldName } from "@/src/common/components/react-hook-form/field/HookFieldName";
import { Fragment, ReactNode } from "react";
import { useFormContext } from "react-hook-form";

type Props = {
	isOptional?: boolean;
	label?: ReactNode;
	description?: ReactNode;
	name: HookFieldName;
};

export const HookField_Header = (p: Props) => {
	const methods = useFormContext();
	const fieldState = methods.getFieldState(p.name, methods.formState);
	const error = fieldState.error;
	const isHeader = Boolean(p.label) || Boolean(p.description);
	if (!isHeader) return null;
	return (
		<Fragment>
			<HookField_Label for={p.name} isOptional={p.isOptional}>
				{p.label}
			</HookField_Label>
			<HookField_Description>{p.description}</HookField_Description>
		</Fragment>
	);
};
