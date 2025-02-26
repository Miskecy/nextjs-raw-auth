import { z } from "zod"

export const signInSchema = z.object({
	email: z.string().email(),
	password: z.string().min(8, {
		message: "Password must be at least 8 characters.",
	}),
})

export const signUpSchema = z.object({
	name: z.string().min(2, {
		message: "name must be at least 2 characters.",
	}),
	email: z.string().email(),
	password: z.string().min(8, {
		message: "Password must be at least 8 characters.",
	}),
	confirmPassword: z.string().min(8, {
		message: "Password must be at least 8 characters.",
	})
}).refine((data) => data.password === data.confirmPassword, {
	message: "Passwords do not match.",
	path: ["confirmPassword"],
})