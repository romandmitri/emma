"use client";

import { TooltipProvider } from "@/src/common/components/shadcn/tooltip";
import { queryClient } from "@/src/modules/tankstack/query/QueryKey";
import { WidgetContent } from "@/src/modules/widget/components/content/WidgetContent";
import { WidgetLauncher } from "@/src/modules/widget/components/launcher/WidgetLauncher";
import { WidgetProvider } from "@/src/modules/widget/context/WidgetProvider";
import { WidgetId } from "@/src/modules/widget/type/WidgetId";
import { QueryClientProvider } from "@tanstack/react-query";

type Props = {
	widgetId: WidgetId | undefined;
	isOpen?: boolean;
	baseUrl?: string;
};

export const Widget = (p: Props) => {
	return (
		<QueryClientProvider client={queryClient}>
			<TooltipProvider>
				<WidgetProvider widgetId={p.widgetId} isOpen={p.isOpen} baseUrl={p.baseUrl}>
					<WidgetLauncher />
					<WidgetContent />
				</WidgetProvider>
			</TooltipProvider>
		</QueryClientProvider>
	);
};
