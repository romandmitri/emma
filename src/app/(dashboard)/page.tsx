import { Routes } from "@/src/app/routes";
import { db } from "@/src/common/adapters/kysely/db";
import Link from "next/link";
import { Fragment } from "react";

export default async function Page() {
	const users = await db.selectFrom("users").selectAll().execute();

	return (
		<div className={"flex flex-col"}>
			<div>{"EMMA"}</div>
			{[
				//
				Routes.Widget_Embed,
				Routes.Widget_Native,
			].map((route) => {
				return (
					<Fragment key={route}>
						<Link href={route}>{route}</Link>
					</Fragment>
				);
			})}
			<div>{"stuff..."}</div>
			<div>{`Users in database: ${users.length}`}</div>
			<pre>{JSON.stringify(users, null, 2)}</pre>
		</div>
	);
}
