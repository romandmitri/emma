import { pool } from "@/src/common/adapters/kysely/db";
import { seed } from "@/src/common/adapters/kysely/seed";

async function main() {
	console.log(`Database seed...`);
	try {
		await seed();
	} catch (err) {
		console.error("Seed execution failed with error:", err);
		process.exit(1);
	} finally {
		await pool.end();
	}
}

main();
