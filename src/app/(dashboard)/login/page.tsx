"use client";

import { Routes } from "@/src/app/routes";
import { signIn } from "next-auth/react";
import { useEffect } from "react";

export default function Page() {
	useEffect(() => {
		const searchParams = new URLSearchParams(window.location.search);
		const callbackUrl = searchParams.get("callbackUrl") || Routes.Home;
		signIn("workos", { callbackUrl });
	}, []);

	// TODO: reidenzon - Put a loader here...
	return <div className="flex min-h-screen items-center justify-center">{"..."}</div>;
}
