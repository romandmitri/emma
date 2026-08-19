import { Routes } from "@/src/app/routes";
import { db } from "@/src/common/adapters/kysely/db";
import { Config } from "@/src/common/Config";
import { auth, signIn } from "@/src/modules/auth/auth";
import { UserNav } from "@/src/modules/auth/components/UserNav";
import { EmmaLogo } from "@/src/modules/branding/EmmaLogo";
import Link from "next/link";
import { Fragment } from "react";

// REMINDER: Force cache reset when searchParams NOT used.
export const dynamic = "force-dynamic";

export default async function Page() {
	const session = await auth();
	const users = await db.selectFrom("users").selectAll().execute();

	return (
		<div className="mx-auto flex w-full max-w-4xl flex-col gap-6 p-8">
			<header className="border-border flex items-center justify-between border-b pb-4">
				<div className="flex items-center gap-3">
					<EmmaLogo size={36} />
					<div>
						<h1 className="text-xl font-bold tracking-tight">EMMA</h1>
						<p className="text-muted-foreground text-xs">Dashboard</p>
					</div>
				</div>

				<div>
					{session?.user ? (
						<UserNav user={session.user} />
					) : (
						<form
							action={async () => {
								"use server";
								await signIn("workos", { redirectTo: Routes.Dashboard });
							}}
						>
							<button
								type="submit"
								className="bg-primary text-primary-foreground hover:bg-primary/90 inline-flex items-center gap-2 rounded-lg px-3.5 py-2 text-xs font-medium transition-colors"
							>
								{"Sign In"}
							</button>
						</form>
					)}
				</div>
			</header>

			<section className="border-border bg-card flex flex-col gap-2 rounded-lg border p-4">
				<h2 className="text-muted-foreground text-xs font-semibold tracking-wider uppercase">Navigation</h2>
				<div className="flex flex-wrap gap-2">
					{[Routes.Widget_Embed, Routes.Widget_Native, Routes.Login].map((route) => {
						return (
							<Fragment key={route}>
								<Link
									href={route}
									className="border-border/80 bg-secondary/50 text-secondary-foreground hover:bg-accent rounded-md border px-3 py-1.5 text-xs transition-colors"
								>
									{route}
								</Link>
							</Fragment>
						);
					})}
				</div>
			</section>

			{session?.user && (
				<Fragment>
					<section className="border-border bg-card flex flex-col gap-2 rounded-lg border p-4">
						<h2 className="text-muted-foreground text-xs font-semibold tracking-wider uppercase">Active Session</h2>
						<pre className="bg-muted/40 text-muted-foreground overflow-x-auto rounded-md p-3 text-xs">{JSON.stringify(session, null, 2)}</pre>
					</section>
					{Config.DevDisplay && (
						<section className="border-border bg-card flex flex-col gap-2 rounded-lg border p-4">
							<div className="flex items-center justify-between">
								<h2 className="text-muted-foreground text-xs font-semibold tracking-wider uppercase">{"Database Users"}</h2>
								<span className="text-muted-foreground text-xs">{`Total: ${users.length}`}</span>
							</div>
							<pre className="bg-muted/40 text-muted-foreground overflow-x-auto rounded-md p-3 text-xs">{JSON.stringify(users, null, 2)}</pre>
						</section>
					)}
				</Fragment>
			)}
		</div>
	);
}
