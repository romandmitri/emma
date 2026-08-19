import { createDb, pool } from "@/src/common/adapters/kysely/db";
import { runSeed, type SeedEnvironment } from "@/src/common/adapters/kysely/seeds";

async function main() {
	const args = process.argv.slice(2);
	let targetEnv: SeedEnvironment = "local";

	const nodeEnv = (process.env.NODE_ENV as string) || "";
	const appEnv = (process.env.APP_ENV as string) || "";

	if (args.includes("--cluster") || args.includes("cluster")) {
		targetEnv = "cluster";
	} else if (args.includes("--prod") || args.includes("--production") || args.includes("production")) {
		targetEnv = "production";
	} else if (args.includes("--staging") || args.includes("staging")) {
		targetEnv = "staging";
	} else if (args.includes("--local") || args.includes("local")) {
		targetEnv = "local";
	} else if (nodeEnv === "production" || nodeEnv === "staging" || appEnv === "production" || appEnv === "staging") {
		targetEnv = "cluster";
	}

	console.log(`🚀 Database Seed: Target environment is "${targetEnv}"...`);

	const db = createDb(pool);

	try {
		await runSeed(targetEnv, db);
	} catch (err) {
		console.error("Seed execution failed with error:", err);
		process.exit(1);
	} finally {
		await pool.end();
	}
}

main();
