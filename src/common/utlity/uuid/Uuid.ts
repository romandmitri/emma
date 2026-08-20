import { v7, validate } from "uuid";

/** @deprecated REMINDER: Do NOT use directly, always extend! */
export type Uuid = string;

export const newUuid = (): Uuid => v7({});

export const validateUuid = (id: Uuid | string | undefined): Uuid | undefined => {
	return validate(id) ? id : undefined;
}
