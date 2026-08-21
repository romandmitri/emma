import { Button } from "@/src/common/components/shadcn/button";
import { ReactNode } from "react";
import { useFormContext } from "react-hook-form";

type Props = {
	caption?: ReactNode;
	children?: ReactNode;
};

export const HookButton_Reset = (p: Props) => {
	const methods = useFormContext();
	const formState = methods.formState; // register

	const handleReset = async () => {
		methods.reset();
	};

	if (!formState.isDirty) return null;

	return (
		<Button
			//
			type={"button"}
			onClick={handleReset}
			variant={"ghost"}
		>
			{p.children ?? p.caption ?? "Reset"}
		</Button>
	);
};
