import { StoryTable } from "@/src/modules/story/type/StoryTable";
import { UserTable } from "@/src/modules/user/type/UserTable";
import { WidgetTable } from "@/src/modules/widget/type/WidgetTable";

// https://kysely.dev/docs/getting-started#types
export interface Database {
	users: UserTable;
	stories: StoryTable;
	widgets: WidgetTable;
}
