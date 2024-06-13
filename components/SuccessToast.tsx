'use client'

import { useToast } from '@/components/ui/use-toast'
import { useSearchParams } from 'next/navigation'
import React, { useEffect } from 'react'

export default function SuccessToast() {
  const searchParams = useSearchParams()
  const { toast } = useToast()
  const success = searchParams.get('success')

  useEffect(() => {
    if (success) {
      toast({
        title: 'Success',
        variant: 'success',
        description: 'Username updated successfully',
      })
    }
  }, [success])

  return <></>
}
