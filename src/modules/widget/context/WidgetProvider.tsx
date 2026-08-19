"use client";

import { ApiKey } from "@/src/modules/auth/type/ApiKey";
import { createContext, ReactNode, useContext, useState } from "react";

export type WidgetContextInterface = {
	apiKey: ApiKey | undefined;
	isOpen: boolean;
	setIsOpen: (is: boolean) => void;
};

export const WidgetContext = createContext<WidgetContextInterface | undefined>(undefined);

export const WidgetProvider = (p: {
	//
	children: ReactNode;
	context: WidgetContextInterface;
}) => {
	const context = p.context; //  ?? useWidgetContext({});
	return <WidgetContext.Provider value={context}>{p.children}</WidgetContext.Provider>;
};

export const useWidget = (): WidgetContextInterface => {
	const ctx = useContext(WidgetContext);
	if (!ctx) throw new Error("useWidget() is NOT in <WidgetProvider />");
	return ctx;
};

export const useWidgetContext = (p: {
	//
	apiKey: ApiKey | undefined;
	isOpen?: boolean;
}) => {
	const [isOpen, setIsOpen] = useState<boolean>(p.isOpen ?? false);

	const context: WidgetContextInterface = {
		apiKey: p.apiKey,
		isOpen: isOpen,
		setIsOpen: setIsOpen,
	};

	return context;
};
