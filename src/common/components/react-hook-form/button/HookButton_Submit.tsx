import { Button, buttonVariants } from "@/src/common/components/shadcn/button";
import { VariantProps } from "class-variance-authority";
import { ReactNode } from "react";
import { useFormContext } from "react-hook-form";

type Props = {
	caption?: ReactNode;
	children?: ReactNode;
	isDisabled?: boolean;
	isDisableClean?: boolean;
	isHideClean?: boolean;
	isLoading?: boolean;
} & VariantProps<typeof buttonVariants>;

export const HookButton_Submit = (p: Props) => {
	const methods = useFormContext();
	const formState = methods.formState; // register

	const isDirty = formState.isDirty;
	const isDisableClean = p.isDisableClean ?? true;
	const isDisabled = p.isDisabled || (!isDirty && isDisableClean);
	const isHideClean = p.isHideClean ?? false;

	if (!isDirty && isHideClean) return null;

	return (
		<Button
			//
			disabled={isDisabled}
			isLoading={p.isLoading || formState.isSubmitting}
			type={"submit"}
			size={p.size}
			variant={p.variant}
		>
			{p.children ?? p.caption ?? "Save"}
		</Button>
	);
};
