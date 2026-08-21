import { HookFieldName } from "@/src/common/components/react-hook-form/field/HookFieldName";
import { useFormContext } from "react-hook-form";

type Props = {
	name: HookFieldName;
};

export const HookField_Error = (p: Props) => {
	const methods = useFormContext();
	const fieldState = methods.getFieldState(p.name, methods.formState);
	const error = fieldState.error;

	const isShow = fieldState.invalid || fieldState.isTouched || fieldState.isDirty;

	if (!isShow) return null;
	if (!error) return null;

	return <p className={"text-destructive text-sm"}>{error.message}</p>;
};
