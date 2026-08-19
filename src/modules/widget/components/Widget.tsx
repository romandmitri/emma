"use client";

import { cn } from "@/src/common/components/cn";
import { useWidgetContext, WidgetProvider } from "@/src/modules/widget/context/WidgetProvider";

type Props = {
	apiKey: string;
};

export const Widget = (p: Props) => {
	const apiKey = p.apiKey;
	console.log("Widget", { apiKey });

	const wc = useWidgetContext({
		apiKey: p.apiKey,
		isOpen: false,
	});

	const isOpen = wc.isOpen;

	return (
		<WidgetProvider context={wc}>
			<div
				className={cn(
					//
					// "dark",
					"bg-secondary text-primary",
					{ "fixed inset-0": wc.isOpen },
				)}
			>
				<div>{!isOpen && <button onClick={() => wc.setIsOpen(true)}>{"open"}</button>}</div>
				<div>{isOpen && <button onClick={() => wc.setIsOpen(false)}>{"close"}</button>}</div>
			</div>
		</WidgetProvider>
	);
};
