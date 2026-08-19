export const Config = {
	AuthSecret: process.env.AUTH_SECRET ?? "secret",
	AuthDuration: process.env.AUTH_DURATION ?? "60m",
	DevAlpha: process.env.DEV_ALPHA ?? "",
	DevDisplay: process.env.DEV_DISPLAY == "true",
	DatabaseUrl: process.env.DATABASE_URL,
	NodeEnv: process.env.NODE_ENV ?? "",
	Version: process.env.VERSION,
	WorkOS_ClientId: process.env.WORKOS_CLIENT_ID,
	WorkOS_ClientSecret: process.env.WORKOS_API_KEY,
};
