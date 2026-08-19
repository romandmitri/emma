const initString = (key: string, defaultValue: string): string => {
	return process.env[key] ?? defaultValue;
};

export const Config = {
	DevAlpha: initString("DEV_ALPHA", ""),
	Version: process.env.APP_VERSION,
};
