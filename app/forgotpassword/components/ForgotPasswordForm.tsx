'use client'

import UseFormStatusPendingButton from '@/components/UseFormStatusPendingButton'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { forgotPassword } from './actions'
import { useFormState } from 'react-dom'
import { useEffect } from 'react'
import { useToast } from '@/components/ui/use-toast'

export default function ForgotPasswordForm() {
  const [state, formAction] = useFormState(forgotPassword, null)
  const { toast } = useToast()

  useEffect(() => {
    if (state?.status === 'success') {
      toast({
        variant: 'success',
        description: 'Check your email for a password reset link',
      })
    }

    if (state?.status === 'error') {
      toast({
        description: state.message,
        variant: 'destructive',
      })
    }
  }, [state])

  return (
    <form className="space-y-6" action={formAction}>
      <div>
        <Label htmlFor="email" className="sr-only">
          Email address
        </Label>
        <Input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          placeholder="Email address"
        />
      </div>
      <UseFormStatusPendingButton
        text="Send a password reset email"
        style="w-full"
        variant="default"
      />
    </form>
  )
}
