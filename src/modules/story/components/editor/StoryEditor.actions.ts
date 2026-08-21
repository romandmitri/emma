"use server";

import { Routes } from "@/src/app/routes";
import { actFail, ActionResponse, actSuccess } from "@/src/common/utlity/action/ActionResponse";
import { StoryId } from "@/src/modules/story/type/StoryId";
import { StoryTabler, StoryUpdate } from "@/src/modules/story/type/StoryTable";
import { getCurrentUser } from "@/src/modules/user/service/UserService";
import { revalidatePath } from "next/cache";

export const StoryEditor_update = async (id: StoryId | undefined, story: StoryUpdate): Promise<ActionResponse> => {
	const currentUser = await getCurrentUser();
	if (!currentUser) return actFail("Current user is NOT set!");

	const existingStory = await StoryTabler.select({ id: id });
	if (!existingStory) return actFail(`Could NOT find [${id}] story!`);

	if (existingStory.userId !== currentUser.id) return actFail("Do NOT have permissions!");

	const newStory = existingStory.clone();
	if (story.raw !== undefined) newStory.raw = story.raw;
	await StoryTabler.update(existingStory, newStory);

	// TODO: reidenzon - Can this be done on FE instead?!
	revalidatePath(Routes.Story);

	return actSuccess(undefined);
};
