"use client";

import { HookButton_Reset } from "@/src/common/components/react-hook-form/button/HookButton_Reset";
import { HookButton_Submit } from "@/src/common/components/react-hook-form/button/HookButton_Submit";
import { HookForm } from "@/src/common/components/react-hook-form/form/HookForm";
import { HookForm_Footer } from "@/src/common/components/react-hook-form/form/HookForm_Footer";
import { HookField_TextArea } from "@/src/common/components/react-hook-form/HookField_Textarea";
import { toast } from "@/src/common/components/shadcn/toast";
import { ZodSchemer } from "@/src/common/utlity/zod/ZodSchemer";
import { StoryUpdater_update } from "@/src/modules/story/components/updater/StoryUpdater.actions";
import { StoryInClient } from "@/src/modules/story/type/Story";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

type Props = {
	story: StoryInClient;
};

export const StoryUpdater = (p: Props) => {
	const story = p.story;

	const schema = z.object({
		update: ZodSchemer.string(),
	});

	type Schema = z.infer<typeof schema>;

	const methods = useForm<Schema>({
		mode: "onChange",
		resolver: zodResolver(schema),
		defaultValues: {
			update: "",
		},
	});

	const handleSubmit = async (data: Schema) => {
		const isSuccess = await StoryUpdater_update(story.id, data.update);
		if (isSuccess) methods.reset(data);
		toast.add({ type: "success", title: "Success" });
	};

	return (
		<HookForm methods={methods} onSubmit={handleSubmit}>
			<HookField_TextArea
				//
				name={"update"}
				label={"Update"}
				description={"What would you like to update?!"}
				className={"max-h-[80vh] min-h-32"}
			/>
			<HookForm_Footer>
				<HookButton_Reset />
				<HookButton_Submit />
			</HookForm_Footer>
		</HookForm>
	);
};
