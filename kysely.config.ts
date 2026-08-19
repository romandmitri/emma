import { createPool } from "@/src/common/adapters/kysely/db"; // Do NOT need <Database> interface here because migrations should be frozen in time.
import { Kysely, PostgresDialect } from "kysely";
import { defineConfig, getKnexTimestampPrefix, TSFileMigrationProvider } from "kysely-ctl";
import { Migrator } from "kysely/migration";
import path from "node:path";

// Do NOT need <Database> interface here because migrations should be frozen in time.
const db = new Kysely<any>({
	dialect: new PostgresDialect({
		pool: createPool(),
	}),
	log: ["query", "error"],
});

const migrationFolder = path.resolve(process.cwd(), "database/migrations");

// https://www.npmjs.com/package/kysely-ctl
export default defineConfig({
	kysely: db,
	migrations: {
		migrationFolder: migrationFolder,
		getMigrationPrefix: getKnexTimestampPrefix,
		migrator: () =>
			new Migrator({
				db: db,
				provider: new TSFileMigrationProvider({
					migrationFolder: migrationFolder,
				}),
			}),
	} as any,
});
