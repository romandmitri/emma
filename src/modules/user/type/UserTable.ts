import { db } from "@/src/common/adapters/kysely/db";
import { Email, normalizeEmail } from "@/src/common/utlity/email/Email";
import { validateUuid } from "@/src/common/utlity/uuid/Uuid";
import { RoleKey } from "@/src/modules/permissions/type/RoleKey";
import { User } from "@/src/modules/user/type/User";
import { UserDetailsInDatabase } from "@/src/modules/user/type/UserDetails";
import { UserId } from "@/src/modules/user/type/UserId";
import { Expression, Generated, Insertable, Selectable, Updateable } from "kysely";

export type UserTable = {
	created_at: Generated<Date>;
	updated_at: Generated<Date>;
	id: UserId;
	email: Email;
	details: UserDetailsInDatabase;
	roles: RoleKey[];
};

export type UserInsert = Insertable<UserTable>;
export type UserSelect = Selectable<UserTable>;
export type UserUpdate = Updateable<UserTable>;

export class UserTabler {
	static insert = async (user: User): Promise<User> => {
		const result = await db
			//
			.insertInto("users")
			.values(user.toDatabaseInsert())
			.returningAll()
			.executeTakeFirstOrThrow();
		return User.fromDatabase(result)!;
	};

	static select = async (p: {
		//
		id?: UserId;
		email?: Email;
	}): Promise<User | undefined> => {
		const id = validateUuid(p.id);
		if (!id && !p.email) return undefined;
		const row = await db
			.selectFrom("users as u")
			.selectAll()
			.where((eb) => {
				const or: Expression<any>[] = [];
				if (id) or.push(eb("u.id", "=", id));
				if (p.email) or.push(eb("u.email", "=", normalizeEmail(p.email)));
				return eb.or(or);
			})
			.executeTakeFirst();
		return User.fromDatabase(row);
	};

	static update = async (oldUser: User | undefined, newUser: User) => {
		await db
			//
			.updateTable("users")
			.set(newUser.toDatabaseUpdate(oldUser))
			.where("id", "=", newUser.id)
			.execute();
	};
}
