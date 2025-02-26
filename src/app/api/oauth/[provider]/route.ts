import { redirect } from "next/navigation"
import { NextRequest } from "next/server"
import { z } from "zod"
import { cookies } from "next/headers"

import { OAuthProvider, UserRole } from "@prisma/client"
import { getOAuthClient } from "@/auth/core/oauth/base"
import { createUserSession } from "@/auth/core/session"

import db from "@/lib/db"

export async function GET(
	request: NextRequest,
	{ params }: { params: Promise<{ provider: string }> }
) {
	const { provider: rawProvider } = await params
	const code = request.nextUrl.searchParams.get("code")
	const state = request.nextUrl.searchParams.get("state")
	const provider = z.nativeEnum(OAuthProvider).parse(rawProvider.toUpperCase())

	if (typeof code !== "string" || typeof state !== "string") {
		redirect(
			`/auth/sign-in?oauthError=${encodeURIComponent(
				"Failed to connect. Please try again."
			)}`
		)
	}

	const oAuthClient = getOAuthClient(provider)
	try {
		const oAuthUser = await oAuthClient.fetchUser(code, state, await cookies())
		const user = await connectUserToAccount(oAuthUser, provider)
		await createUserSession(user, await cookies())
	} catch (error) {
		console.error(error)
		redirect(
			`/auth/sign-in?oauthError=${encodeURIComponent(
				"Failed to connect. Please try again."
			)}`
		)
	}

	redirect("/")
}

function connectUserToAccount(
	{ id, email, name }: { id: string; email: string; name: string },
	provider: OAuthProvider
) {
	return db.$transaction(
		async tx => {
			// First, check if this OAuth account already exists
			const existingOAuthAccount = await tx.userOAuthAccount.findUnique({
				where: {
					provider_providerAccountId: {
						provider,
						providerAccountId: id
					}
				},
				include: {
					User: {
						select: { id: true, role: true }
					}
				}
			});

			// If this OAuth account already exists, return the associated user
			if (existingOAuthAccount) {
				return existingOAuthAccount.User;
			}

			// If not, check if user exists by email
			let user = await tx.user.findUnique({
				where: { email },
				select: { id: true, role: true }
			})

			// If user doesn't exist, create a new user
			if (user == null) {
				const newUser = await tx.user.create({
					data: {
						email,
						name,
						role: UserRole.USER,
					},
					select: { id: true, role: true },
				})

				user = newUser
			}

			// Create the OAuth account connection
			await tx.userOAuthAccount.create({
				data: {
					userId: user.id,
					provider,
					providerAccountId: id,
				},
			})

			return user
		}
	)
}

