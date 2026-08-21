import { Badge } from "@/src/common/components/shadcn/badge";
import { useFormContext } from "react-hook-form";

type Props = {
	isWarning?: boolean;
};

export const HookForm_Dirty = (p: Props) => {
	const methods = useFormContext();
	const formState = methods.formState; // register

	const isWarning = p.isWarning ?? false;
	const isShow = isWarning && formState.isDirty;
	if (!isShow) return null;

	return <Badge variant={"destructive"}>{"Modified"}</Badge>;
};
