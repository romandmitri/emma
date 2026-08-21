"use client";

import { cn, HtmlClassName } from "@/src/common/components/cn";
import { ReactNode } from "react";
import { FieldValues, FormProvider, SubmitHandler, UseFormReturn } from "react-hook-form";

type Props<V extends FieldValues> = {
	children?: ReactNode;
	className?: HtmlClassName;
	methods: UseFormReturn<V>;
	onSubmit: (data: V) => Promise<void>;
};

export const HookForm = <V extends FieldValues>(p: Props<V>) => {
	const methods = p.methods;

	const handleSubmit: SubmitHandler<V> = async (data, event) => {
		await p.onSubmit(data);
	};

	return (
		<FormProvider {...methods}>
			<form
				//
				className={cn("flex flex-col gap-4 p-4", p.className)}
				onSubmit={methods.handleSubmit(handleSubmit)}
			>
				{p.children}
			</form>
		</FormProvider>
	);
};
