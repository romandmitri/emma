"use client";

import { Routes } from "@/src/app/routes";
import { cn } from "@/src/common/components/cn";
import { signOut } from "next-auth/react";
import { useState } from "react";

export interface SignOutButtonProps {
	callbackUrl?: string;
	className?: string;
	text?: string;
}

// TODO: reidenzon - Clean up this AI slop!
export function SignOutButton({ callbackUrl = Routes.Dashboard, className, text = "Sign out" }: SignOutButtonProps) {
	const [isLoading, setIsLoading] = useState(false);

	const handleSignOut = async () => {
		try {
			setIsLoading(true);
			await signOut({ callbackUrl });
		} catch (error) {
			console.error("Failed to sign out:", error);
			setIsLoading(false);
		}
	};

	return (
		<button
			type="button"
			onClick={handleSignOut}
			disabled={isLoading}
			className={cn(
				"text-muted-foreground inline-flex items-center justify-center gap-2 rounded-md px-3 py-1.5 text-xs font-medium transition-colors",
				"hover:bg-destructive/10 hover:text-destructive",
				"focus-visible:ring-ring focus-visible:ring-2 focus-visible:outline-none",
				"disabled:cursor-not-allowed disabled:opacity-50",
				className,
			)}
		>
			{isLoading ? (
				<svg className="h-3.5 w-3.5 animate-spin" viewBox="0 0 24 24" fill="none">
					<circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
					<path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
				</svg>
			) : (
				<svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth="2"
						d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
					/>
				</svg>
			)}
			<span>{isLoading ? "Signing out..." : text}</span>
		</button>
	);
}
