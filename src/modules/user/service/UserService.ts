import { db } from "@/src/common/adapters/kysely/db";
import type { UserSelect } from "@/src/modules/user/type/UserTable";
import { sql } from "kysely";

export async function findUserByEmail(email: string): Promise<UserSelect | undefined> {
	return await db
		.selectFrom("users")
		.selectAll()
		.where(sql`LOWER(email)`, "=", email.toLowerCase().trim())
		.executeTakeFirst();
}

export async function findUserById(id: string): Promise<UserSelect | undefined> {
	return await db.selectFrom("users").selectAll().where("id", "=", id).executeTakeFirst();
}

export interface SyncWorkOSUserInput {
	email: string;
	name?: string | null;
	image?: string | null;
	sub?: string | null;
}

export async function syncWorkOSUser(input: SyncWorkOSUserInput): Promise<UserSelect> {
	const normalizedEmail = input.email.toLowerCase().trim();
	const existing = await findUserByEmail(normalizedEmail);

	if (existing) {
		const existingDetails = (existing.details as Record<string, unknown>) || {};
		const updatedDetails: Record<string, unknown> = {
			...existingDetails,
			...(input.name ? { name: input.name } : {}),
			...(input.image ? { image: input.image } : {}),
			...(input.sub ? { workos_id: input.sub } : {}),
			last_login_at: new Date().toISOString(),
		};

		const updated = await db
			.updateTable("users")
			.set({
				details: updatedDetails,
				updated_at: new Date(),
			})
			.where("id", "=", existing.id)
			.returningAll()
			.executeTakeFirstOrThrow();

		return updated;
	}

	const newId = crypto.randomUUID();
	const newDetails: Record<string, unknown> = {
		name: input.name ?? null,
		image: input.image ?? null,
		workos_id: input.sub ?? null,
		last_login_at: new Date().toISOString(),
	};

	const created = await db
		.insertInto("users")
		.values({
			id: newId,
			email: normalizedEmail,
			details: newDetails,
		})
		.returningAll()
		.executeTakeFirstOrThrow();

	return created;
}
