"use server";

import { Routes } from "@/src/app/routes";
import { AiModel, getAiModel } from "@/src/common/adapters/ai/AiModel";
import { actFail, ActionResponse, actSuccess } from "@/src/common/utlity/action/ActionResponse";
import { getPrompt, PromptPath } from "@/src/modules/prompt/type/PromptPath";
import { StoryId } from "@/src/modules/story/type/StoryId";
import { StoryTabler } from "@/src/modules/story/type/StoryTable";
import { getCurrentUser } from "@/src/modules/user/service/UserService";
import { Patchlet } from "@romandmitri/ai-patch";
import { generateText, Output } from "ai";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export const StoryUpdater_update = async (id: StoryId | undefined, update: string): Promise<ActionResponse> => {
	const currentUser = await getCurrentUser();
	if (!currentUser) return actFail("Current user is NOT set!");

	const existingStory = await StoryTabler.select({ id: id });
	if (!existingStory) return actFail(`Could NOT find [${id}] story!`);

	if (existingStory.userId !== currentUser.id) return actFail("Do NOT have permissions!");

	const newStory = existingStory.clone();

	const rawPatchlet = Patchlet.from(newStory.raw ?? "");

	const aiResult = await generateText({
		model: getAiModel(AiModel.Story_Update),
		instructions: await getPrompt(PromptPath.Story_Update),
		messages: [
			//
			{ role: "user", content: "The [update_instructions]:\n" + update },
			{ role: "user", content: "The [raw_story]: \n" + rawPatchlet.content },
		],
		output: Output.object({
			schema: z.object({
				storyPatches: rawPatchlet.toSchema(),
			}),
		}),
	});

	const output = aiResult.output;
	console.log("StoryUpdater_update.output", output);

	newStory.raw = rawPatchlet.patch(output.storyPatches);
	// console.log("StoryUpdater_update.rawUpdated", newStory.raw);

	await StoryTabler.update(existingStory, newStory);

	// TODO: reidenzon - Can this be done on FE instead?!
	revalidatePath(Routes.StoryEditor);
	revalidatePath(Routes.StoryUpdater);

	return actSuccess(undefined);
};
