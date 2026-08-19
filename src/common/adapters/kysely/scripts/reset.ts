import { createDb, pool } from "@/src/common/adapters/kysely/db";
import { runSeed } from "@/src/common/adapters/kysely/seeds";
import { sql } from "kysely";
import { TSFileMigrationProvider } from "kysely-ctl";
import { Migrator } from "kysely/migration";
import path from "node:path";

async function main() {
	const db = createDb(pool);

	try {
		await sql`
			DROP SCHEMA public CASCADE;
			CREATE SCHEMA public;
			GRANT ALL ON SCHEMA public TO CURRENT_USER;
			GRANT ALL ON SCHEMA public TO PUBLIC;
		`.execute(db);

		const migrator = new Migrator({
			db,
			provider: new TSFileMigrationProvider({
				migrationFolder: path.resolve(process.cwd(), "database/migrations"),
			}),
		});

		await migrator.migrateToLatest();
		await runSeed("local", db);
		console.log("✨ Database successfully reset, migrated, and seeded!");
	} finally {
		await pool.end();
	}
}

main();
