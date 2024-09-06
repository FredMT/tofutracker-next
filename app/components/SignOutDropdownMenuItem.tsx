'use client'
import { DropdownMenuItem } from '@/components/ui/dropdown-menu'
import { useSignOut } from '@/hooks/useSignOut'
import { sign } from 'crypto'
import React from 'react'

export default function SignOutDropdownMenuItem() {
  const { signOut, isLoading } = useSignOut()
  return (
    <DropdownMenuItem
      className="cursor-pointer"
      onClick={signOut}
      disabled={isLoading}
    >
      Sign out
    </DropdownMenuItem>
  )
}
