"use client";

import { QueryKey } from "@/src/modules/tankstack/query/QueryKey";
import { api_GET_widget } from "@/src/modules/widget/query/api-get-widget";
import { WidgetInClient } from "@/src/modules/widget/type/Widget";
import { WidgetId } from "@/src/modules/widget/type/WidgetId";
import { useQuery } from "@tanstack/react-query";
import { createContext, ReactNode, useContext, useState } from "react";

export type WidgetContextInterface = {
	widgetId: WidgetId | undefined;
	widget: WidgetInClient | undefined;
	isOpen: boolean;
	setIsOpen: (is: boolean) => void;
	baseUrl?: string;
};

export const WidgetContext = createContext<WidgetContextInterface | undefined>(undefined);

export const WidgetProvider = (p: {
	//
	children: ReactNode;
	widgetId: WidgetId | undefined;
	isOpen?: boolean;
	baseUrl?: string;
}) => {
	const [isOpen, setIsOpen] = useState<boolean>(p.isOpen ?? false);

	const apiGet = useQuery({
		enabled: Boolean(p.widgetId),
		queryKey: QueryKey.Widget(p.widgetId),
		queryFn: () => api_GET_widget({ widgetId: p.widgetId!, baseUrl: p.baseUrl }),
	});
	const widget = apiGet.data?.widget;

	const context: WidgetContextInterface = {
		widgetId: p.widgetId,
		widget: widget,
		isOpen: isOpen,
		setIsOpen: setIsOpen,
		baseUrl: p.baseUrl,
	};

	if (!widget) return null;

	return <WidgetContext.Provider value={context}>{p.children}</WidgetContext.Provider>;
};

export const useWidget = (): WidgetContextInterface => {
	const ctx = useContext(WidgetContext);
	if (!ctx) throw new Error("useWidget() is NOT in <WidgetProvider />");
	return ctx;
};
