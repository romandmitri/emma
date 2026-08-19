import { getDbConfig } from "@/src/common/adapters/kysely/config";
import type { Database } from "@/src/common/adapters/kysely/Database";
import { Kysely, PostgresDialect } from "kysely";
import pg from "pg";

const { Pool } = pg;

export const createPool = () => {
	const config = getDbConfig();
	return new Pool(config.poolConfig);
};

export const createDb = (customPool?: pg.Pool) => {
	const activePool = customPool ?? createPool();
	const dialect = new PostgresDialect({ pool: activePool });
	return new Kysely<Database>({ dialect });
};

// Singleton pattern to prevent multiple pool instances during Next.js hot-reloading
const globalForDb = globalThis as unknown as {
	db?: Kysely<Database>;
	pool?: pg.Pool;
};

export const pool = globalForDb.pool ?? createPool();
export const db =
	globalForDb.db ??
	new Kysely<Database>({
		dialect: new PostgresDialect({ pool }),
	});

if (process.env.NODE_ENV !== "production") {
	globalForDb.pool = pool;
	globalForDb.db = db;
}
