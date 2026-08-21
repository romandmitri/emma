import { WidgetEmbedder } from "@/src/app/(blank)/widget/embed/components/WidgetEmbedder";
import { Config } from "@/src/common/Config";
import { UserTabler } from "@/src/modules/user/type/UserTable";
import { WidgetTabler } from "@/src/modules/widget/type/WidgetTable";
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Embed",
};

export default async function Page() {
	// TODO: reidenzon - User generic test widget instead... or pass value via query params.
	if (!Config.DevDisplay) return null;
	const user = await UserTabler.select({ email: "romandmitri@gmail.com" });
	const widget = await WidgetTabler.ensure(user?.id);
	return (
		<main className={"p-4"}>
			{"embed"}
			<WidgetEmbedder widgetId={widget?.id} />
		</main>
	);
}
