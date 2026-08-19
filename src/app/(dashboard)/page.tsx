import { Routes } from "@/src/app/routes";
import Link from "next/link";
import { Fragment } from "react";

export default function Page() {
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
		</div>
	);
}
