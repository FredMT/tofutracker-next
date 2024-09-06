'use client'

import { Button } from '@/components/ui/button'
import { useSignOut } from '@/hooks/useSignOut'
import { Loader2, LogOut } from 'lucide-react'

export default function Signout() {
  const { signOut, isLoading } = useSignOut()

  return (
    <Button onClick={signOut} disabled={isLoading}>
      {isLoading ? (
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      ) : (
        <LogOut className="mr-2 h-4 w-4" />
      )}
      {isLoading ? 'Signing out...' : 'Sign Out'}
    </Button>
  )
}
