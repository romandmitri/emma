"use client";

import { SessionProvider as NextAuthSessionProvider } from "next-auth/react";
import type { ReactNode } from "react";

export interface Props {
	children: ReactNode;
}

export function SessionProvider({ children }: Props) {
	return <NextAuthSessionProvider>{children}</NextAuthSessionProvider>;
}
