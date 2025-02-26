import { env } from "@/data/env/server"
import { OAuthClient } from "./base"
import { z } from "zod"
import { OAuthProvider } from "@prisma/client"

export function createGithubOAuthClient() {
	return new OAuthClient({
		provider: OAuthProvider.GITHUB,
		clientId: env.GITHUB_CLIENT_ID,
		clientSecret: env.GITHUB_CLIENT_SECRET,
		scopes: ["user:email", "read:user"],
		urls: {
			auth: "https://github.com/login/oauth/authorize",
			token: "https://github.com/login/oauth/access_token",
			user: "https://api.github.com/user",
		},
		userInfo: {
			schema: z.object({
				id: z.number(),
				name: z.string().nullable(),
				login: z.string(),
				email: z.string().email()
			}),
			parser: (userData) => {
				// If no email is found, use a fallback pattern
				if (!userData.email) {
					// Generate a fallback email using GitHub username
					// This ensures we have a unique identifier for the user
					const fallbackEmail = `${userData.login}@github.com`;

					return {
						id: userData.id.toString(),
						name: userData.name ?? userData.login,
						email: fallbackEmail,
					};
				}

				return {
					id: userData.id.toString(),
					name: userData.name ?? userData.login,
					email: userData.email,
				};
			},
		},
	});
}