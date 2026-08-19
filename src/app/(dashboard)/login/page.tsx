"use client";

import { Routes } from "@/src/app/routes";
import { EmmaLogo } from "@/src/modules/branding/EmmaLogo";
import { signIn, useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useRef } from "react";

function LoginContent() {
	const searchParams = useSearchParams();
	const router = useRouter();
	const { status } = useSession();
	const initiatedRef = useRef(false);

	const callbackUrl = searchParams.get("callbackUrl") || Routes.Dashboard;

	useEffect(() => {
		if (status === "authenticated") {
			router.replace(callbackUrl);
		} else if (status === "unauthenticated" && !initiatedRef.current) {
			initiatedRef.current = true;
			signIn("workos", { callbackUrl });
		}
	}, [status, callbackUrl, router]);

	return (
		<main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-4 py-12">
			<div className="flex flex-col items-center space-y-4 text-center">
				<EmmaLogo size={56} />
				<div className="text-muted-foreground flex items-center gap-2 text-xs">
					<svg className="text-primary h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
						<circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
						<path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
					</svg>
					<span>Connecting to WorkOS...</span>
				</div>
			</div>
		</main>
	);
}

export default function LoginPage() {
	return (
		<Suspense
			fallback={
				<main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-4 py-12">
					<div className="flex flex-col items-center space-y-4 text-center">
						<EmmaLogo size={56} />
					</div>
				</main>
			}
		>
			<LoginContent />
		</Suspense>
	);
}
