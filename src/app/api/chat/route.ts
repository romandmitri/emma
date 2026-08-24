import { AiModel, getAiModel } from "@/src/common/adapters/ai/AiModel";
import { EmotionTool } from "@/src/modules/emotion/type/EmotionTool";
import { getPrompt, PromptPath } from "@/src/modules/prompt/type/PromptPath";
import { StoryTabler } from "@/src/modules/story/type/StoryTable";
import { WidgetId } from "@/src/modules/widget/type/WidgetId";
import { WidgetTabler } from "@/src/modules/widget/type/WidgetTable";
import { convertToModelMessages, isStepCount, streamText, UIMessage } from "ai";
import { NextResponse } from "next/server";

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

// https://elements.ai-sdk.dev/components/prompt-input#usage-with-ai-sdk

export async function POST(req: Request) {
	const request = (await req.json()) as {
		messages: UIMessage[];
		widgetId: WidgetId;
	};

	const widgetId = request.widgetId;
	if (!widgetId) {
		return NextResponse.json({ error: "Widget ID is required" }, { status: 400 });
	}

	const widget = await WidgetTabler.select({ id: widgetId });
	if (!widget) {
		return NextResponse.json({ error: "Widget not found" }, { status: 404 });
	}

	const story = await StoryTabler.ensure(widget.userId);
	if (!story) return NextResponse.json({ error: "Story not found" }, { status: 404 });

	const tools = {
		setEmotion: EmotionTool,
	};

	const result = streamText({
		model: getAiModel(AiModel.Widget_Chat),
		stopWhen: isStepCount(2),
		instructions: [
			//
			await getPrompt(PromptPath.Widget_Chat),
			"The story:\n\n" + story.raw,
		].join("\n"),
		messages: await convertToModelMessages(request.messages, { tools }),
		tools: tools,
	});

	return result.toUIMessageStreamResponse();
}
