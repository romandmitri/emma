import { WidgetId } from "@/src/modules/widget/type/WidgetId";
import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient();

export const QueryKey = {
	Widget: (w?: WidgetId) => ["api/widget", w].filter(Boolean),
};
