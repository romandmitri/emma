import { NextResponse } from "next/server";
import * as fs from "node:fs";
import path from "node:path";

/**
 * This route serves the "loader.generated.js" file to clients.
 * The "loader.generated.js" file is compiled from "loader.tsx" file.
 */
export async function GET() {
	const filePath = path.join(process.cwd(), "src/public/loader.generated.js");
	const fileContent = fs.readFileSync(filePath, "utf-8");
	return new NextResponse(fileContent, {
		status: 200,
		headers: {
			"Content-Type": "application/javascript; charset=utf-8",
			"Access-Control-Allow-Origin": "*",
			"Access-Control-Allow-Methods": "GET, OPTIONS",
			// TODO: reidenzon - Enable caching.
			// "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400",
		},
	});
}

export async function OPTIONS() {
	return new NextResponse(null, {
		status: 204,
		headers: {
			"Access-Control-Allow-Origin": "*",
			"Access-Control-Allow-Methods": "GET, OPTIONS",
			"Access-Control-Allow-Headers": "*",
		},
	});
}
