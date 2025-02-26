'use client'

import SignInForm from "@/auth/nextjs/components/sign-in-form";

import { Card } from "@/components/ui/card";

export default function SignInCard() {
	return (
		<div className="max-w-lg w-full flex flex-col items-center gap-4">
			<div className="flex flex-col items-center">
				<h1 className="text-2xl font-bold">Sign In</h1>
				<h2 className="text-lg font-medium text-muted-foreground">NextJS - Raw Authentication</h2>
			</div>
			<Card className="w-full p-8 space-y-8">
				<SignInForm />
			</Card>
		</div>
	)
}
