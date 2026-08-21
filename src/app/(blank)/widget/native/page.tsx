import { Config } from "@/src/common/Config";
import { UserTabler } from "@/src/modules/user/type/UserTable";
import { Widget } from "@/src/modules/widget/components/Widget";
import { WidgetTabler } from "@/src/modules/widget/type/WidgetTable";
import type { Metadata } from "next";
// import "@/src/modules/widget/widget.css";
import "@/src/modules/widget/widget.generated.css";

export const metadata: Metadata = {
	title: "Native",
};

export default async function Page() {
	// TODO: reidenzon - User generic test widget instead... or pass value via query params.
	if (!Config.DevDisplay) return null;
	const user = await UserTabler.select({ email: "romandmitri@gmail.com" });
	const widget = await WidgetTabler.ensure(user?.id);
	const widgetId = widget?.id;
	return (
		<div>
			<h2>{"native"}</h2>
			<div className={"p-4"}>
				<Widget widgetId={widgetId} isOpen />
			</div>
		</div>
	);
}
