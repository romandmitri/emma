import { normalizeEmail } from "@/src/common/utlity/email/Email";
import { newUuid } from "@/src/common/utlity/uuid/Uuid";
import { auth } from "@/src/modules/auth/auth";
import { RoleKey } from "@/src/modules/permissions/type/RoleKey";
import { RoleKeyCollection } from "@/src/modules/permissions/type/RoleKeyCollection";
import { User } from "@/src/modules/user/type/User";
import { UserDetails } from "@/src/modules/user/type/UserDetails";
import { UserTabler } from "@/src/modules/user/type/UserTable";
import { cache } from "react";

// TODO: reidenzon - Rework and move this AI slop to a standard place.

export interface SyncWorkOSUserInput {
	email: string;
	name?: string | null;
	image?: string | null;
	sub?: string | null;
}

export async function syncWorkOSUser(input: SyncWorkOSUserInput): Promise<User> {
	const email = normalizeEmail(input.email);

	const existingUser = await UserTabler.select({ email: email });
	if (existingUser) return existingUser;

	// TODO: reidenzon - Consider to NOT insert user?!
	return await UserTabler.insert(
		new User({
			id: newUuid(),
			email: email,
			details: new UserDetails({ name: input.name ?? undefined }),
			roles: RoleKeyCollection.fromRoles([RoleKey.Member]),
		}),
	);
}

// TODO: reidenzon - Move to a better place?!
export const getCurrentUser = cache(async (): Promise<User | undefined> => {
	const session = await auth();
	// TODO: reidenzon - Consider fallback via [email] which helps on local resets.
	return await UserTabler.select({ id: session?.user.id });
});
