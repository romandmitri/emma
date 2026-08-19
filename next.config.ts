import type { NextConfig } from "next";

const { version } = require("./package.json");

const nextConfig: NextConfig = {
	/* config options here */
	env: {
		APP_VERSION: version,
	},
	// async headers() {
	// 	return [
	// 		{
	// 			source: "/:path*",
	// 			headers: [
	// 				{ key: "Access-Control-Allow-Origin", value: "*" },
	// 				{ key: "Access-Control-Allow-Methods", value: "GET, POST, PUT, DELETE, PATCH, OPTIONS" },
	// 				{ key: "Access-Control-Allow-Headers", value: "*" },
	// 			],
	// 		},
	// 	];
	// },
};

export default nextConfig;
