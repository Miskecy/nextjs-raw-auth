"use client"


import { Button } from '@/components/ui/button'
import React from 'react'

import { logOut } from "@/auth/nextjs/actions";
import { cn } from '@/lib/utils';

type Props = {
	className?: string;
}

export default function LogOutButton({ className }: Props) {
	return (
		<Button className={cn('min-w-24', className)} variant="destructive" onClick={async () => await logOut()}>
			Log Out
		</Button>
	)
}
