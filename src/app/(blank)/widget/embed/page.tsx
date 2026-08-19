import { WidgetEmbedder } from "@/src/app/(blank)/widget/embed/components/WidgetEmbedder";
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Embed",
};

export default function Page() {
	return (
		<main className={"p-4"}>
			{"embed"}
			<WidgetEmbedder />
		</main>
	);
}
