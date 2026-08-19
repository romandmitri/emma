import { Config } from "@/src/common/Config";
import dotenv from "dotenv";
import fs from "node:fs";
import path from "node:path";
import type { PoolConfig } from "pg";

const rootDir = process.cwd();
const envLocal = path.resolve(rootDir, ".env.local");
const envDefault = path.resolve(rootDir, ".env");

if (fs.existsSync(envLocal)) dotenv.config({ path: envLocal });
if (fs.existsSync(envDefault)) dotenv.config({ path: envDefault });

export interface DbConfig {
	connectionString: string;
	poolConfig: PoolConfig;
}

export const getDbConfig = (): DbConfig => {
	const url = Config.DatabaseUrl ?? "";

	const isLocal = url.includes("localhost") || url.includes("127.0.0.1");
	const isSsl = url.includes("sslmode=require") || url.includes("neon.tech") || (!isLocal && Config.NodeEnv === "production");

	return {
		connectionString: url,
		poolConfig: {
			connectionString: url,
			ssl: isSsl ? { rejectUnauthorized: false } : false,
			max: Config.NodeEnv === "production" ? 10 : 5,
			idleTimeoutMillis: 30000,
			connectionTimeoutMillis: 5000,
		},
	};
};
