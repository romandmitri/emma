import { z, ZodString } from "zod";

export class ZodSchemer {
	static string = (p?: { min?: number; max?: number }): ZodString => {
		const min = p?.min ?? 1;
		const max = p?.max;

		let schema = z.string();

		if (min !== undefined) {
			if (min == 1) schema = schema.min(min, "Required.");
			if (min >= 2) schema = schema.min(min, `Must be ${min} or more characters.`);
		}
		if (max !== undefined) {
			schema = schema.max(max, `Must be ${max} or less characters.`);
		}

		return schema;
	};
}
