import { AuditDelta, joinDelta } from "@/src/modules/audit/type/AuditDelta";
import { UserName } from "@/src/modules/user/type/UserName";

export type UserDetailsInDatabase = {
	name?: UserName;
};

export class UserDetails {
	name?: UserName;

	constructor(p: {
		//
		name?: UserName;
	}) {
		this.name = p.name;
	}

	static fromDatabase = (from: UserDetailsInDatabase): UserDetails => {
		return new UserDetails({
			name: from.name,
		});
	};

	toDatabase = (): UserDetailsInDatabase => {
		return {
			name: this.name,
		};
	};

	toDelta = (): AuditDelta => {
		return joinDelta([this.name]);
	};
}
