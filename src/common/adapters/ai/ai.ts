import { Config } from "@/src/common/Config";
import { createGateway } from "@ai-sdk/gateway";

// https://openrouter.ai/models
// https://openrouter.ai/announcements/simplifying-our-platform-fee
// https://vercel.com/ai-gateway/models

export const aiGateway = createGateway({
	apiKey: Config.Vercel_AiGateway_Key,
});
