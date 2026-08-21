import { UserInClient } from "@/src/modules/user/type/User";
import { WidgetInClient } from "@/src/modules/widget/type/Widget";

export type WidgetBundleInClient = {
	widget: WidgetInClient;
	user: UserInClient; // owner
};
