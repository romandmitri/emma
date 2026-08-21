export const getRequestOrigin = (req: Request): string => {
	const host = req.headers.get("x-forwarded-host") || req.headers.get("host");
	if (!host) return "";
	const proto =
		req.headers.get("x-forwarded-proto") ||
		(host.includes("localhost") || host.includes("127.0.0.1") ? "http" : "https");
	return `${proto}://${host}`;
};
