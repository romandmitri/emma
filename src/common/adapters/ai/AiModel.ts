import { aiGateway } from "@/src/common/adapters/ai/ai";
import { GatewayModelId } from "@ai-sdk/gateway";
import { createRetryableModel } from "ai-retry/language-model";

export type LanguageModel = ReturnType<typeof createRetryableModel>;

export type AiModel = GatewayModelId;

export type AiModelInfo = {
	model: LanguageModel;
	retries: LanguageModel[];
};

const register = (...models: AiModel[]): AiModelInfo => {
	return {
		model: aiGateway(models[0]),
		retries: models.map((m) => aiGateway(m)), // always retry 1st model.
	};
};

// https://openrouter.ai/models
// https://openrouter.ai/announcements/simplifying-our-platform-fee
// https://vercel.com/ai-gateway/models

// "meta/llama-3.1-8b" 				in=$0.02/M	out=$0.05/M
// "google/gemini-3.5-flash-lite"	in=$0.30/M	out=$2.50/M

export const AiModel = {
	Widget_Chat: register(
		// "meta/llama-3.1-8b", // cheap... but generally NOT accurate, sloppy response.
		"google/gemini-3.5-flash-lite",
	),
};

export const getAiModel = (info: AiModelInfo): LanguageModel => {
	return createRetryableModel({
		model: info.model,
		retries: info.retries,
	});
};
