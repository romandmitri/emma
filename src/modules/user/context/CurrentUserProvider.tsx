"use client";

import { UserInClient } from "@/src/modules/user/type/User";
import { createContext, ReactNode, useContext } from "react";

export type CurrentUserContextInterface = {
	// TODO: reidenzon - Create CurrentUser class instead.
	user: UserInClient;
};

export const CurrentUserContext = createContext<CurrentUserContextInterface | undefined>(undefined);

export const CurrentUserProvider = (p: {
	//
	children: ReactNode;
	user: UserInClient;
}) => {
	// const context = p.context; //  ?? useCurrentUserContext({});
	const context: CurrentUserContextInterface = {
		user: p.user,
	};
	return <CurrentUserContext.Provider value={context}>{p.children}</CurrentUserContext.Provider>;
};

export const useCurrentUser = (): CurrentUserContextInterface => {
	const ctx = useContext(CurrentUserContext);
	if (!ctx) throw new Error("useCurrentUser() is NOT in <CurrentUserProvider />");
	return ctx;
};
