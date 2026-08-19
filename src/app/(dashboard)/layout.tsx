import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "@/src/app/(dashboard)/globals.css";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "Emma", // "Dashboard",
};

export default function Layout(p: LayoutProps<"/">) {
	return (
		<html lang="en" className={`${geistSans.variable} ${geistMono.variable} dark h-full antialiased`}>
			<body className="flex min-h-full flex-col">{p.children}</body>
		</html>
	);
}
