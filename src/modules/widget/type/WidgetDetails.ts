import { AuditDelta, joinDelta } from "@/src/modules/audit/type/AuditDelta";

export type WidgetDetailsInClient = {};

export type WidgetDetailsInDatabase = {};

export class WidgetDetails {
	constructor(p: {}) {}

	static fromDatabase = (from: WidgetDetailsInDatabase): WidgetDetails => {
		return new WidgetDetails({});
	};

	clone = (): WidgetDetails => {
		return new WidgetDetails({});
	};

	toClient = (): WidgetDetailsInClient => {
		return {};
	};

	toDatabase = (): WidgetDetailsInDatabase => {
		return {};
	};

	toDelta = (): AuditDelta => {
		return joinDelta([]);
	};
}
