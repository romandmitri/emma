import { StoryTable } from "@/src/modules/story/type/StoryTable";
import { UserTable } from "@/src/modules/user/type/UserTable";

// https://kysely.dev/docs/getting-started#types
export interface Database {
	users: UserTable;
	stories: StoryTable;
}
