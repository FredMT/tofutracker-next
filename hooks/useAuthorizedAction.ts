'use client'

import { useCallback } from 'react'
import { useToast } from '@/components/ui/use-toast'

export function useAuthorizedAction(isAuthorized: boolean) {
  const { toast } = useToast()

  const runAuthorizedAction = useCallback(
    (action: () => void) => {
      if (isAuthorized) {
        action()
      } else {
        toast({
          variant: 'destructive',
          title: 'Unauthorized',
          description: 'You are not authorized to perform this action.',
        })
      }
    },
    [isAuthorized, toast]
  )

  return runAuthorizedAction
}
