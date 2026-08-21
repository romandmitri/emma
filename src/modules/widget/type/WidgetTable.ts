import { db } from "@/src/common/adapters/kysely/db";
import { newUuid, validateUuid } from "@/src/common/utlity/uuid/Uuid";
import { UserId } from "@/src/modules/user/type/UserId";
import { Widget } from "@/src/modules/widget/type/Widget";
import { WidgetDetails, WidgetDetailsInDatabase } from "@/src/modules/widget/type/WidgetDetails";
import { WidgetId } from "@/src/modules/widget/type/WidgetId";
import { Expression, Generated, Insertable, Selectable, Updateable } from "kysely";

export type WidgetTable = {
	created_at: Generated<Date>;
	updated_at: Generated<Date>;
	id: WidgetId;
	user_id: UserId;
	details: WidgetDetailsInDatabase;
};

export type WidgetInsert = Insertable<WidgetTable>;
export type WidgetSelect = Selectable<WidgetTable>;
export type WidgetUpdate = Updateable<WidgetTable>;

export class WidgetTabler {
	static ensure = async (userId: UserId | undefined): Promise<Widget | undefined> => {
		if (!userId) return;
		const existingWidget = await WidgetTabler.select({ userId: userId });
		if (existingWidget) return existingWidget;
		return await WidgetTabler.insert(
			new Widget({
				id: newUuid(),
				userId: userId,
				details: new WidgetDetails({}),
			}),
		);
	};

	static insert = async (widget: Widget): Promise<Widget> => {
		const result = await db
			//
			.insertInto("widgets")
			.values(widget.toDatabaseInsert())
			.returningAll()
			.executeTakeFirstOrThrow();
		return Widget.fromDatabase(result)!;
	};

	static select = async (p: {
		//
		id?: WidgetId;
		userId?: UserId;
	}): Promise<Widget | undefined> => {
		const id = validateUuid(p.id);
		const userId = validateUuid(p.userId);
		if (!id && !userId) return undefined;
		const row = await db
			.selectFrom("widgets as w")
			.selectAll()
			.where((eb) => {
				const or: Expression<any>[] = [];
				if (id) or.push(eb("w.id", "=", id));
				if (userId) or.push(eb("w.user_id", "=", userId));
				return eb.or(or);
			})
			.executeTakeFirst();
		return Widget.fromDatabase(row);
	};

	static update = async (oldWidget: Widget | undefined, newWidget: Widget) => {
		await db
			//
			.updateTable("widgets")
			.set(newWidget.toDatabaseUpdate(oldWidget))
			.where("id", "=", newWidget.id)
			.execute();
	};
}
