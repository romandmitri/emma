import type { Database } from "@/src/common/adapters/kysely/Database";
import { db } from "@/src/common/adapters/kysely/db";
import { seedCluster } from "@/src/common/adapters/kysely/seeds/cluster";
import { seedLocal } from "@/src/common/adapters/kysely/seeds/local";
import type { Kysely } from "kysely";

// TODO: reidenzon - Rework this AI trash!

export type SeedEnvironment = "local" | "cluster" | "production" | "staging";

export async function runSeed(targetEnv?: SeedEnvironment, customDb?: Kysely<Database>): Promise<void> {
	const activeDb = customDb ?? db;
	const nodeEnv = (process.env.NODE_ENV as string) || "";
	const appEnv = (process.env.APP_ENV as string) || "";

	const isCloudEnv = nodeEnv === "production" || nodeEnv === "staging" || appEnv === "production" || appEnv === "staging";

	const env = targetEnv || (process.env.SEED_TARGET as SeedEnvironment) || (isCloudEnv ? "cluster" : "local");

	if (env === "cluster" || env === "production" || env === "staging") {
		await seedCluster(activeDb);
	} else {
		await seedLocal(activeDb);
	}
}
