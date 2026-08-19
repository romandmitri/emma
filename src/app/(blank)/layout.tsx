import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "(blank)",
};

export default function Layout(p: LayoutProps<"/">) {
	return (
		<html lang="en">
			<body>
				<main>{p.children}</main>
			</body>
		</html>
	);
}
