"use client";

import { useCurrentUser } from "@/src/modules/user/context/CurrentUserProvider";
import { Fragment, ReactNode } from "react";

type Props = {
	children?: ReactNode;
};

export const RootAccess = (p: Props) => {
	const cu = useCurrentUser();
	const user = cu.user;

	if (!user.isRoot) return;

	return <Fragment>{p.children}</Fragment>;
};
