import { HtmlClassName } from "@/src/common/components/cn";
import { HookField } from "@/src/common/components/react-hook-form/field/HookField";
import { HookFieldName } from "@/src/common/components/react-hook-form/field/HookFieldName";
import { Textarea } from "@/src/common/components/shadcn/textarea";
import { KeyboardEvent, ReactNode } from "react";
import { useFormContext } from "react-hook-form";

type Props = {
	isAutoFocus?: boolean;
	isDisabled?: boolean;
	isOptional?: boolean;
	name: HookFieldName;
	label?: ReactNode;
	description?: ReactNode;
	className?: HtmlClassName;
	placeholder?: string;
};

export const HookField_TextArea = (p: Props) => {
	const methods = useFormContext();
	const value = methods.watch(p.name) as string;

	const handleKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
		if ((event.ctrlKey || event.metaKey) && event.key == "Enter") {
			const target = event.currentTarget;
			const form = target.form;
			form?.requestSubmit();
		}
	};

	return (
		<HookField
			//
			isOptional={p.isOptional}
			name={p.name}
			label={p.label}
			description={p.description}
		>
			<Textarea
				{...methods.register(p.name)}
				autoFocus={p.isAutoFocus}
				autoComplete={"off"}
				className={p.className}
				data-1p-ignore
				disabled={p.isDisabled}
				id={p.name}
				onKeyDown={handleKeyDown}
				placeholder={p.placeholder}
			/>
		</HookField>
	);
};
