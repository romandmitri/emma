import { Config } from "@/src/common/Config";
import { syncWorkOSUser } from "@/src/modules/user/service/UserService";
import { WorkOS } from "@workos-inc/node";
import NextAuth from "next-auth";

export const workos = new WorkOS(Config.WorkOS_ClientSecret, {
	clientId: Config.WorkOS_ClientId,
});

export const { handlers, auth, signIn, signOut } = NextAuth({
	providers: [
		{
			id: "workos",
			name: "WorkOS",
			type: "oauth",
			clientId: Config.WorkOS_ClientId,
			clientSecret: Config.WorkOS_ClientSecret,
			authorization: {
				url: "https://api.workos.com/user_management/authorize",
				params: { provider: "authkit", response_type: "code" },
			},
			token: {
				url: "https://api.workos.com/user_management/authenticate",
				async conform(response: Response) {
					if (response.ok) {
						const data = await response.json();
						data.token_type ??= "Bearer";
						return Response.json(data, { status: response.status, headers: response.headers });
					}
					return response;
				},
			},
			userinfo: {
				url: "https://api.workos.com/user_management/users/me",
			},
			client: {
				token_endpoint_auth_method: "client_secret_post",
			},
			profile(profile, tokens) {
				const user = (profile as any)?.user ?? (tokens as any)?.user ?? profile;
				return {
					id: user.id ?? (profile as any)?.id ?? (profile as any)?.sub,
					name: [user.first_name, user.last_name].filter(Boolean).join(" ") || user.name || user.email?.split("@")[0] || "User",
					email: user.email,
					image: user.profile_picture_url ?? null,
				};
			},
			style: {
				bg: "#6363f1",
				text: "#fff",
			},
		},
	],
	session: {
		strategy: "jwt",
	},
	callbacks: {
		async signIn({ user, account, profile }) {
			if (account?.provider === "workos" && user?.email) {
				try {
					await syncWorkOSUser({
						email: user.email,
						name: user.name ?? (profile?.name as string | undefined),
						image: user.image ?? (profile?.picture as string | undefined),
						sub: account.providerAccountId ?? user.id,
					});
				} catch (err) {
					console.error("Error syncing WorkOS user in signIn callback:", err);
				}
			}
			return true;
		},
		async jwt({ token, user, account, profile }) {
			if (user?.email) {
				token.email = user.email;
				try {
					const dbUser = await syncWorkOSUser({
						email: user.email,
						name: user.name ?? (profile?.name as string | undefined),
						image: user.image ?? (profile?.picture as string | undefined),
						sub: account?.providerAccountId ?? (token.sub as string | undefined),
					});
					if (dbUser?.id) {
						token.sub = dbUser.id;
						token.userId = dbUser.id;
					}
				} catch (err) {
					console.error("Error syncing user in jwt callback:", err);
				}
			}
			return token;
		},
		async session({ session, token }) {
			if (session.user && token?.sub) {
				session.user.id = token.sub;
			}
			return session;
		},
	},
	trustHost: true,
	secret: Config.AuthSecret,
});
