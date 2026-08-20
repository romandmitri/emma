import { createDb, pool } from "@/src/common/adapters/kysely/db";
import { seed } from "@/src/common/adapters/kysely/seed";
import { sql } from "kysely";
import { TSFileMigrationProvider } from "kysely-ctl";
import { Migrator } from "kysely/migration";
import path from "node:path";

async function main() {
	console.log("Database reset...");
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
		await seed();

		console.log("Database successfully reset, migrated, and seeded!");
	} finally {
		await pool.end();
	}
}

main();
