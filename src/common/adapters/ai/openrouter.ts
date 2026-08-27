import { Config } from "@/src/common/Config";
import { createOpenRouter } from "@openrouter/ai-sdk-provider";

export const openrouter = createOpenRouter({
	apiKey: Config.OpenRouter_ApiKey,
});
