import { isDelta } from "@/src/modules/audit/type/AuditDelta";
import { UserId } from "@/src/modules/user/type/UserId";
import { WidgetDetails, WidgetDetailsInClient } from "@/src/modules/widget/type/WidgetDetails";
import { WidgetId } from "@/src/modules/widget/type/WidgetId";
import { WidgetInsert, WidgetSelect, WidgetUpdate } from "@/src/modules/widget/type/WidgetTable";

export type WidgetInClient = {
	id: WidgetId;
	userId: UserId;
	details: WidgetDetailsInClient;
};

export class Widget {
	id: WidgetId;
	userId: UserId;
	details: WidgetDetails;

	constructor(p: {
		//
		id: WidgetId;
		userId: UserId;
		details: WidgetDetails;
	}) {
		this.id = p.id;
		this.userId = p.userId;
		this.details = p.details;
	}

	static fromDatabase = (from: WidgetSelect | undefined): Widget | undefined => {
		if (!from) return;
		return new Widget({
			id: from.id,
			userId: from.user_id,
			details: WidgetDetails.fromDatabase(from.details),
		});
	};

	clone = (): Widget => {
		return new Widget({
			id: this.id,
			userId: this.userId,
			details: this.details.clone(),
		});
	};

	toClient = (): WidgetInClient => {
		return {
			id: this.id,
			userId: this.userId,
			details: this.details.toClient(),
		};
	};

	toDatabaseInsert = (): WidgetInsert => {
		return {
			id: this.id,
			user_id: this.userId,
			details: this.details.toDatabase(),
		};
	};

	toDatabaseUpdate = (from?: Widget): WidgetUpdate => {
		const up: WidgetUpdate = {};
		up.updated_at = new Date();
		if (from?.id !== this.id) up.id = this.id;
		if (from?.userId !== this.userId) up.user_id = this.userId;
		if (isDelta(from?.details, this.details)) up.details = this.details.toDatabase();
		return up;
	};
}
