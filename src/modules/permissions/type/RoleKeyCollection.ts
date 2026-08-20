import { AuditDelta, joinDelta } from "@/src/modules/audit/type/AuditDelta";
import { RoleKey } from "@/src/modules/permissions/type/RoleKey";

export class RoleKeyCollection {
	private roles = new Set<RoleKey>();

	constructor(p: {}) {}

	static fromRoles = (roles: RoleKey[]): RoleKeyCollection => {
		const rc = new RoleKeyCollection({});
		rc.addRoles(roles);
		return rc;
	};

	addRole = (role: RoleKey): RoleKeyCollection => {
		this.roles.add(role);
		return this;
	};

	addRoles = (roles: RoleKey[]): RoleKeyCollection => {
		roles.forEach((role) => this.addRole(role));
		return this;
	};

	getRoles = (): RoleKey[] => {
		return [...this.roles].sort();
	};

	hasRole = (role: RoleKey): boolean => {
		return this.roles.has(role);
	};

	toDelta = (): AuditDelta => {
		return joinDelta(this.getRoles());
	};
}
