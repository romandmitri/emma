import type { Database } from "@/src/common/adapters/kysely/Database";
import type { Kysely } from "kysely";

// TODO: reidenzon - Rework this AI trash!

export async function seedCluster(db: Kysely<Database>): Promise<void> {
	// Add cluster/production base seeding here if needed
}
