import { EmotionType } from "@/src/modules/emotion/type/EmotionType";
import { tool, UIMessage } from "ai";
import { z } from "zod";

export const EmotionToolInputSchema = z.object({
	emotion: z.enum(EmotionType).describe("The avatar emotion to display"),
});

export const EmotionTool = tool({
	description: "Set the avatar emotion reflecting your current mood or tone for this message. Call this tool once per response.",
	inputSchema: EmotionToolInputSchema,
	execute: async () => "Emotion set",
});

export const getLatestEmotion = (messages: UIMessage[]): EmotionType => {
	const lastAssistant = messages.findLast((m) => m.role === "assistant");
	const toolPart = lastAssistant?.parts.findLast((p) => p.type === "tool-setEmotion");

	if (!toolPart || !("input" in toolPart)) {
		return EmotionType.Neutral;
	}

	const parsed = EmotionToolInputSchema.safeParse(toolPart.input);
	if (!parsed.success) return EmotionType.Neutral;

	return parsed.data.emotion;
};
