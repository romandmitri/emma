import type { Database } from "@/src/common/adapters/kysely/Database";
import type { Kysely } from "kysely";

// TODO: reidenzon - Rework this AI trash!

export async function seedLocal(db: Kysely<Database>): Promise<void> {
	await db
		.insertInto("users")
		.values([
			{
				id: "a0000000-0000-0000-0000-000000000001",
				email: "dev@emma.local",
				details: { name: "Developer Demo" },
			},
		])
		.onConflict((oc) => oc.column("id").doNothing())
		.execute();
}
