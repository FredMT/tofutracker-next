'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useToast } from '@/components/ui/use-toast'

export const useSignOut = () => {
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)

  const signOut = async () => {
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

  return { signOut, isLoading }
}
