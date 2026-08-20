"use client";

import { createContext, ReactNode, useContext } from "react";

export type RootContextInterface = {};

export const RootContext = createContext<RootContextInterface | undefined>(undefined);

export const RootProvider = (p: {
	//
	children: ReactNode;
}) => {
	const context: RootContextInterface = {};
	return <RootContext.Provider value={context}>{p.children}</RootContext.Provider>;
};

export const useRoot = (): RootContextInterface => {
	const ctx = useContext(RootContext);
	if (!ctx) throw new Error("useRoot() is NOT in <RootProvider />");
	return ctx;
};
