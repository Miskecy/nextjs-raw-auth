"use client"

import { toggleRole } from "@/actions/toggle-role"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

type Props = {
	className?: string
}

export function ToggleRoleButton({ className }: Props) {
	return <Button className={cn(className)} onClick={toggleRole}>Toggle Role</Button>
}