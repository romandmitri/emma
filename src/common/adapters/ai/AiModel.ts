import { openrouter } from "@/src/common/adapters/ai/openrouter";
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
		// model: aiGateway(models[0]),
		model: openrouter(models[0]),
		retries: models.map((m) => openrouter(m)), // always retry 1st model.
	};
};

// https://openrouter.ai/models
// https://openrouter.ai/announcements/simplifying-our-platform-fee
// "google/gemini-3.5-flash-lite"	$0.30/$2.50
// "google/gemini-3.7-flash"		$1.50/$7.50 | 75% off at $0.375/$1.875

// https://vercel.com/ai-gateway/models
// "meta/llama-3.1-8b" 				$0.02/$0.05
// "google/gemini-3.5-flash-lite"	$0.30/$2.50
// "google/gemini-3.7-flash"		$1.50/$7.50 | 50% off at $0.50/$3.75

export const AiModel = {
	Widget_Chat: register(
		// "meta/llama-3.1-8b", // cheap... but generally NOT accurate, sloppy response.
		"google/gemini-3.5-flash-lite", // accurate enough, fast response
		// "google/gemini-3.7-flash", // accurate, but feels slow
	),
};

export const getAiModel = (info: AiModelInfo): LanguageModel => {
	return createRetryableModel({
		model: info.model,
		retries: info.retries,
	});
};
