import { env } from "@/data/env/server"
import { OAuthClient } from "./base"
import { z } from "zod"
import { OAuthProvider } from "@prisma/client"

export function createGoogleOAuthClient() {
	return new OAuthClient({
		provider: OAuthProvider.GOOGLE,
		clientId: env.GOOGLE_CLIENT_ID,
		clientSecret: env.GOOGLE_CLIENT_SECRET,
		scopes: [
			"openid",
			"email",
			"profile",
			"https://www.googleapis.com/auth/userinfo.email",
			"https://www.googleapis.com/auth/userinfo.profile"
		],
		urls: {
			auth: "https://accounts.google.com/o/oauth2/v2/auth",
			token: "https://oauth2.googleapis.com/token",
			user: "https://openidconnect.googleapis.com/v1/userinfo",
		},
		userInfo: {
			schema: z.object({
				sub: z.string(),
				email: z.string().email(),
				name: z.string(),
				picture: z.string().url(),
			}),
			parser: user => ({
				id: user.sub, // Google's unique user ID field is `sub`
				email: user.email,
				name: user.name,
			}),
		},
	})
}