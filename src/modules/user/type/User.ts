import { dbJson } from "@/src/common/adapters/kysely/db-query";
import { Email, normalizeEmail } from "@/src/common/utlity/email/Email";
import { isDelta } from "@/src/modules/audit/type/AuditDelta";
import { RoleKey } from "@/src/modules/permissions/type/RoleKey";
import { RoleKeyCollection } from "@/src/modules/permissions/type/RoleKeyCollection";
import { UserDetails, UserDetailsInClient } from "@/src/modules/user/type/UserDetails";
import { UserId } from "@/src/modules/user/type/UserId";
import { UserInsert, UserSelect, UserUpdate } from "@/src/modules/user/type/UserTable";

export type UserInClient = {
	id: UserId;
	email: Email;
	details: UserDetailsInClient;
	// TODO: reidenzon - Provide Avatar URLs here! (with emotions)
	displayName: string;
	displayInitials: string;
	isRoot?: boolean;
	roles: RoleKey[];
};

export class User {
	id: UserId;
	email: Email;
	details: UserDetails;
	roles: RoleKeyCollection;

	constructor(p: {
		//
		id: UserId;
		email: Email;
		details: UserDetails;
		roles: RoleKeyCollection;
	}) {
		this.id = p.id;
		this.email = p.email;
		this.details = p.details;
		this.roles = p.roles;
	}

	static fromDatabase = (from: UserSelect | undefined): User | undefined => {
		if (!from) return;
		return new User({
			id: from.id,
			email: normalizeEmail(from.email),
			details: UserDetails.fromDatabase(from.details),
			roles: RoleKeyCollection.fromRoles(from.roles),
		});
	};

	getDisplayName = (): string => {
		return this.details.name || this.email.split("@")[0] || "User";
	};

	getDisplayInitials = (): string => {
		const parts = (this.details.name ?? "")
			.split(" ")
			.map((p) => p.toUpperCase()[0])
			.splice(0, 2)
			.join("");
		if (!parts.length) return "";
		return parts;
	};

	getIsRoot = (): boolean => {
		return this.roles.hasRole(RoleKey.Root);
	};

	toClient = (): UserInClient => {
		return {
			id: this.id,
			email: normalizeEmail(this.email),
			details: this.details.toClient(),
			displayName: this.getDisplayName(),
			displayInitials: this.getDisplayInitials(),
			isRoot: this.getIsRoot(),
			roles: this.roles.getRoles(),
		};
	};

	toDatabaseInsert = (): UserInsert => {
		return {
			id: this.id,
			email: normalizeEmail(this.email),
			details: this.details.toDatabase(),
			roles: dbJson(this.roles.getRoles()),
		};
	};

	toDatabaseUpdate = (from?: User): UserUpdate => {
		const up: UserUpdate = {};
		up.updated_at = new Date();
		if (from?.id !== this.id) up.id = this.id;
		if (from?.email !== this.email) up.email = normalizeEmail(this.email);
		if (isDelta(from?.details, this.details)) up.details = this.details.toDatabase();
		if (isDelta(from?.roles, this.roles)) up.roles = dbJson(this.roles.getRoles());
		return up;
	};
}
