import { getRequestOrigin } from "@/src/common/utlity/http/requestOrigin";
import { NextResponse } from "next/server";
import * as fs from "node:fs";
import path from "node:path";

/**
 * This route serves the "loader.generated.js" file to clients.
 * The "loader.generated.js" file is compiled from "loader.tsx" file.
 */
export async function GET(req: Request) {
	const filePath = path.join(process.cwd(), "src/public/loader.generated.js");
	const fileContent = fs.readFileSync(filePath, "utf-8");

	const origin = getRequestOrigin(req);
	const payload = origin ? fileContent.replaceAll("__SERVER_ORIGIN_PLACEHOLDER__", origin) : fileContent;

	return new NextResponse(payload, {
		status: 200,
		headers: {
			"Content-Type": "application/javascript; charset=utf-8",
			"Access-Control-Allow-Origin": "*",
			// TODO: reidenzon - Enable caching.
			// "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400",
		},
	});
}
