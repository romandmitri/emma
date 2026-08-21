import { Config } from "@/src/common/Config";
import { readFile } from "node:fs/promises";
import path from "node:path";

const prefix = path.join(process.cwd(), "src/modules/prompt/prompts");

export const PromptPath = {
	Widget_Chat: path.join(prefix, "widget-chat.md"),
};

const prompt = new Map<string, string>();

export const getPrompt = async (path: string): Promise<string> => {
	// Always read from disk in developer mode to avoid prompt-editing confusion!
	if (!prompt.has(path) || Config.DevDisplay) {
		prompt.set(path, await readFile(path, "utf-8"));
	}
	return prompt.get(path)!;
};
