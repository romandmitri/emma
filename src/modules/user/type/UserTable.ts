import { Generated, Insertable, Selectable, Updateable } from "kysely";

export interface UserTable {
	id: string;
	email: string | null;
	details: Record<string, unknown>;
	created_at: Generated<Date>;
	updated_at: Generated<Date>;
}

export type UserInsert = Insertable<UserTable>;
export type UserSelect = Selectable<UserTable>;
export type UserUpdate = Updateable<UserTable>;
