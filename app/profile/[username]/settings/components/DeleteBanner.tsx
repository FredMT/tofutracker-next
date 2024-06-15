'use client'
import { Button } from '@/components/ui/button'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useToast } from '@/components/ui/use-toast'

export default function DeleteBanner({
  userId,
  username,
}: {
  userId: string
  username: string
}) {
  const router = useRouter()
  const { toast } = useToast()
  const [isPending, setIsPending] = useState(false)

  async function handleDelete(userId: string) {
    setIsPending(true)
    const response = await fetch(`/api/deleteBanner/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ user_id: userId }),
    })

    if (response.ok) {
      toast({
        title: 'Banner deleted successfully',
        variant: 'success',
      })
      router.refresh()
    } else {
      toast({
        title: 'Failed to delete banner',
        variant: 'destructive',
      })
    }
    setIsPending(false)
  }
  return isPending ? (
    <Button variant="destructive" className="mt-2 w-20">
      <div className="h-5 w-5 animate-spin rounded-full border-b-2 border-white"></div>
    </Button>
  ) : (
    <Button
      variant="destructive"
      className="mt-2 w-20"
      type="submit"
      disabled={isPending}
      onClick={() => handleDelete(userId)}
    >
      Delete
    </Button>
  )
}
