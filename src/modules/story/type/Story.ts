import { StoryId } from "@/src/modules/story/type/StoryId";
import { StoryRaw } from "@/src/modules/story/type/StoryRaw";
import { StoryInsert, StorySelect, StoryUpdate } from "@/src/modules/story/type/StoryTable";
import { UserId } from "@/src/modules/user/type/UserId";

export type StoryInClient = {
	id: StoryId;
	userId: UserId;
	raw: StoryRaw | undefined;
};

export class Story {
	id: StoryId;
	userId: UserId;
	raw: StoryRaw | null;

	constructor(p: {
		//
		id: StoryId;
		userId: UserId;
		raw: StoryRaw | null;
	}) {
		this.id = p.id;
		this.userId = p.userId;
		this.raw = p.raw;
	}

	static fromDatabase = (from: StorySelect | undefined): Story | undefined => {
		if (!from) return;
		return new Story({
			id: from.id,
			userId: from.user_id,
			raw: from.raw,
		});
	};

	clone = (): Story => {
		return new Story({
			id: this.id,
			userId: this.userId,
			raw: this.raw,
		});
	};

	toClient = (): StoryInClient => {
		return {
			id: this.id,
			userId: this.userId,
			raw: this.raw ?? undefined,
		};
	};

	toDatabaseInsert = (): StoryInsert => {
		return {
			id: this.id,
			user_id: this.userId,
			raw: this.raw,
		};
	};

	toDatabaseUpdate = (from?: Story): StoryUpdate => {
		const up: StoryUpdate = {};
		up.updated_at = new Date();
		if (from?.id !== this.id) up.id = this.id;
		if (from?.userId !== this.userId) up.user_id = this.userId;
		if (from?.raw !== this.raw) up.raw = this.raw;
		return up;
	};
}
