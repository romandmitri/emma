export type Email = string;

export const normalizeEmail = (email: Email): Email => {
	return email.toLowerCase().trim();
}
