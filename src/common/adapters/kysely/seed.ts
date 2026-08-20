import { Email } from "@/src/common/utlity/email/Email";
import { newUuid } from "@/src/common/utlity/uuid/Uuid";
import { RoleKey } from "@/src/modules/permissions/type/RoleKey";
import { RoleKeyCollection } from "@/src/modules/permissions/type/RoleKeyCollection";
import { User } from "@/src/modules/user/type/User";
import { UserDetails } from "@/src/modules/user/type/UserDetails";
import { UserName } from "@/src/modules/user/type/UserName";
import { UserTabler } from "@/src/modules/user/type/UserTable";

export const seed = async (): Promise<void> => {
	await seedUser("romandmitri@gmail.com", "Roman Eidenzon", [RoleKey.Root, RoleKey.Member]);
};

const seedUser = async (email: Email, name: UserName, roles: RoleKey[]): Promise<User | undefined> => {
	// This is NOT as efficient as a single UPSERT, but the
	// seed list is small and this reads much cleaner!

	const existingUser = await UserTabler.select({ email: email });
	if (existingUser) return existingUser;

	return await UserTabler.insert(
		new User({
			id: newUuid(),
			email: email,
			details: new UserDetails({ name: name }),
			roles: RoleKeyCollection.fromRoles(roles),
		}),
	);
};
