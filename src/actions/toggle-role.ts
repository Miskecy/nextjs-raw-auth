"use server"

import { updateUserSessionData } from "@/auth/core/session"
import { getCurrentUser } from "@/auth/nextjs/current-user"

import db from "@/lib/db"
import { UserRole } from "@prisma/client"

import { cookies } from "next/headers"

export async function toggleRole() {
	const user = await getCurrentUser({ redirectIfNotFound: true })

	const updatedUser = await db.user.update({
		where: { id: user.id },
		data: { role: user.role === UserRole.ADMIN ? UserRole.USER : UserRole.ADMIN },
		select: { id: true, role: true },
	})

	await updateUserSessionData(updatedUser, await cookies())
}