'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { LogOut, Loader2 } from 'lucide-react'
import { useToast } from '@/components/ui/use-toast'

export default function Signout() {
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)

  const handleSignOut = async () => {
    setIsLoading(true)
    try {
      const response = await fetch('/api/sign-out')
      if (response.ok) {
        router.refresh()
        toast({
          title: 'Signed out successfully',
          description: 'You have been signed out',
          variant: 'success',
        })
      } else {
        console.error('Sign-out failed')
        toast({
          title: 'Sign-out failed',
          description: 'An error occurred while signing out',
          variant: 'destructive',
        })
      }
    } catch (error) {
      console.error('Error during sign-out:', error)
      toast({
        title: 'Sign-out error',
        description: 'An unexpected error occurred',
        variant: 'destructive',
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Button onClick={handleSignOut} disabled={isLoading}>
      {isLoading ? (
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      ) : (
        <LogOut className="mr-2 h-4 w-4" />
      )}
      {isLoading ? 'Signing out...' : 'Sign Out'}
    </Button>
  )
}
