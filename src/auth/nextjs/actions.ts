'use server';

import { z } from "zod"
import { redirect } from "next/navigation"
import { cookies } from "next/headers";

import { signInSchema, signUpSchema } from "./schemas"

import { OAuthProvider } from "@prisma/client";
import db from "@/lib/db";

import {
	comparePasswords,
	generateSalt,
	hashPassword
} from "@/auth/core/password-hasher";
import {
	createUserSession,
	removeUserFromSession
} from "@/auth/core/session";
import { getOAuthClient } from "@/auth/core/oauth/base";

export async function signIn(unsafeData: z.infer<typeof signInSchema>) {
	const { success, data } = signInSchema.safeParse(unsafeData)

	if (!success) return "Unable to log you in"

	const user = await db.user.findUnique({
		where: {
			email: data.email,
		},
	})

	if (user == null || user.password == null || user.salt == null) {
		return "Unable to log you in"
	}

	const isCorrectPassword = await comparePasswords({
		hashedPassword: user.password,
		password: data.password,
		salt: user.salt,
	})

	if (!isCorrectPassword) return "Unable to log you in"

	await createUserSession(user, await cookies())

	redirect("/private")
}

export async function signUp(unsafeData: z.infer<typeof signUpSchema>) {
	const { success, data } = signUpSchema.safeParse(unsafeData)

	if (!success) return "Unable to create account"

	const existingUser = await db.user.findUnique({
		where: {
			email: data.email,
		},
	})

	if (existingUser != null) return "Account already exists for this email"

	try {
		const salt = generateSalt()
		const hashedPassword = await hashPassword(data.password, salt)

		const user = await db.user.create({
			data: {
				name: data.name,
				email: data.email,
				password: hashedPassword,
				salt,
			},
			select: {
				id: true,
				role: true,
			}
		})

		if (user == null) return "Unable to create account"
		await createUserSession(user, await cookies())
	} catch {
		return "Unable to create account"
	}

	redirect("/private")
}

export async function logOut() {
	await removeUserFromSession(await cookies())
	redirect("/")
}

export async function oAuthSignIn(provider: OAuthProvider) {
	const oAuthClient = getOAuthClient(provider)
	redirect(oAuthClient.createAuthUrl(await cookies()))
}