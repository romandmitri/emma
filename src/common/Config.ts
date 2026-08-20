import dotenv from "dotenv";
import fs from "node:fs";
import path from "node:path";

const rootDir = process.cwd();
const envLocal = path.resolve(rootDir, ".env.local");
const envDefault = path.resolve(rootDir, ".env");

if (fs.existsSync(envLocal)) dotenv.config({ path: envLocal });
if (fs.existsSync(envDefault)) dotenv.config({ path: envDefault });

export const Config = {
	AuthSecret: process.env.AUTH_SECRET ?? "secret",
	AuthDuration: process.env.AUTH_DURATION ?? "60m",
	DevAlpha: process.env.DEV_ALPHA ?? "",
	DevDisplay: process.env.DEV_DISPLAY == "true",
	DatabaseUrl: process.env.DATABASE_URL,
	NodeEnv: process.env.NODE_ENV ?? "",
	Version: process.env.VERSION,
	WorkOS_ClientId: process.env.WORKOS_CLIENT_ID,
	WorkOS_ClientSecret: process.env.WORKOS_API_KEY,
};
