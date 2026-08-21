import { db } from "@/src/common/adapters/kysely/db";
import { newUuid, validateUuid } from "@/src/common/utlity/uuid/Uuid";
import { Story } from "@/src/modules/story/type/Story";
import { StoryId } from "@/src/modules/story/type/StoryId";
import { StoryRaw } from "@/src/modules/story/type/StoryRaw";
import { UserId } from "@/src/modules/user/type/UserId";
import { Expression, Generated, Insertable, Selectable, Updateable } from "kysely";

export type StoryTable = {
	created_at: Generated<Date>;
	updated_at: Generated<Date>;
	id: StoryId;
	user_id: UserId;
	raw: StoryRaw | null;
};

export type StoryInsert = Insertable<StoryTable>;
export type StorySelect = Selectable<StoryTable>;
export type StoryUpdate = Updateable<StoryTable>;

export class StoryTabler {
	static ensure = async (userId: UserId | undefined): Promise<Story | undefined> => {
		if (!userId) return;
		const existingStory = await StoryTabler.select({ userId: userId });
		if (existingStory) return existingStory;
		return await StoryTabler.insert(
			new Story({
				id: newUuid(),
				userId: userId,
				raw: "",
			}),
		);
	};

	static insert = async (story: Story): Promise<Story> => {
		const result = await db
			//
			.insertInto("stories")
			.values(story.toDatabaseInsert())
			.returningAll()
			.executeTakeFirstOrThrow();
		return Story.fromDatabase(result)!;
	};

	static select = async (p: {
		//
		id?: StoryId;
		userId?: UserId;
	}): Promise<Story | undefined> => {
		const id = validateUuid(p.id);
		const userId = validateUuid(p.userId);
		if (!id && !userId) return undefined;
		const row = await db
			.selectFrom("stories as s")
			.selectAll()
			.where((eb) => {
				const or: Expression<any>[] = [];
				if (id) or.push(eb("s.id", "=", id));
				if (userId) or.push(eb("s.user_id", "=", userId));
				return eb.or(or);
			})
			.executeTakeFirst();
		return Story.fromDatabase(row);
	};

	static update = async (oldStory: Story | undefined, newStory: Story) => {
		await db
			//
			.updateTable("stories")
			.set(newStory.toDatabaseUpdate(oldStory))
			.where("id", "=", newStory.id)
			.execute();
	};
}
