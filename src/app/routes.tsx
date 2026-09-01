import { WidgetId } from "@/src/modules/widget/type/WidgetId";

export const Routes = {
	Api_Auth_SignIn: "/api/auth/signin",
	Api_Auth_SignOut: "/api/auth/signout",
	Api_Chat: () => "/api/chat",
	Api_Widget: (id: WidgetId) => `/api/widget/${id}`,

	Home: "/",

	Login: "/login",
	Logout: "/logout",

	// TODO: reidenzon - Roll this!
	// Resume: "/resume",
	// Resume_Master: "/resume/master",

	StoryEditor: "/story/editor",
	StoryUpdater: "/story/updater",

	Widget_Embed: "/widget/embed",
	Widget_Loader: "/widget/loader.js",
	Widget_Native: "/widget/native",
};
