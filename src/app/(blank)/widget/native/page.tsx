import { Widget } from "@/src/modules/widget/components/Widget";
import type { Metadata } from "next";
// import "@/src/modules/widget/widget.css";
import "@/src/modules/widget/widget.generated.css";

export const metadata: Metadata = {
	title: "Native",
};

export default function Page() {
	return (
		<div>
			<h2>{"native"}</h2>
			<div className={"p-4"}>
				<Widget apiKey={"key"} />
			</div>
		</div>
	);
}
