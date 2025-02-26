"use client"

import React, { useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { OAuthProvider } from '@prisma/client'

export type FormSchema = z.infer<typeof signInSchema>

import { Button } from "@/components/ui/button"
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

import { signInSchema } from '@/auth/nextjs/schemas'
import { oAuthSignIn, signIn } from '@/auth/nextjs/actions'

export default function SignInForm() {
	const [error, setError] = React.useState<string>("")
	const searchParams = useSearchParams()

	const oauthError = searchParams.get("oauthError")

	useEffect(() => {
		if (oauthError) {
			setError(oauthError)
		}
	}, [oauthError])

	const router = useRouter();

	// 1. Define your form.
	const form = useForm<FormSchema>({
		resolver: zodResolver(signInSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	})

	// 2. Define a submit handler.
	async function handleOnSubmit(values: FormSchema) {
		// Do something with the form values.
		// ✅ This will be type-safe and validated.
		const error = await signIn(values)
		setError(error)
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(handleOnSubmit)} className="space-y-8">
				{error && <p className="text-destructive">{error}</p>}
				<div className="flex gap-4">
					<Button
						type="button"
						onClick={async () => await oAuthSignIn(OAuthProvider.DISCORD)}
					>
						Discord
					</Button>
					<Button
						type="button"
						onClick={async () => await oAuthSignIn(OAuthProvider.GOOGLE)}
					>
						Google
					</Button>
					<Button
						type="button"
						onClick={async () => await oAuthSignIn(OAuthProvider.GITHUB)}
					>
						GitHub
					</Button>
				</div>
				<FormField
					control={form.control}
					name="email"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Email</FormLabel>
							<FormControl>
								<Input placeholder="Johndoe65@mail.com" {...field} />
							</FormControl>
							<FormDescription>
								Enter your email.
							</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="password"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Password</FormLabel>
							<FormControl>
								<Input type='password' placeholder="***************" {...field} />
							</FormControl>
							<FormDescription>
								Enter your password.
							</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
				<div className='flex flex-col gap-4'>
					<Button type="submit" className='w-24'>Enter</Button>
					<div className='w-full flex items-center justify-center gap-2'>
						<span className='text-muted-foreground'>Don&apos;t have account yet? </span>
						<Button
							variant={'link'}
							type="button"
							className='w-fit px-0 text-orange-500'
							onClick={() => router.push('/auth/sign-up')}
						>Sign Up</Button>
					</div>
				</div>
			</form>
		</Form>
	)
}
