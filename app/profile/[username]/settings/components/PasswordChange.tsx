'use client'
import React, { useEffect, useState } from 'react'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import ChangePasswordSubmitButton from './ChangePasswordSubmitButton'
import { changePassword } from './actions'
import { useToast } from '@/components/ui/use-toast'
import { useFormState } from 'react-dom'

export default function PasswordChange() {
  const [state, formAction] = useFormState(changePassword, null)
  const { toast } = useToast()

  useEffect(() => {
    if (state?.error) {
      toast({
        title: 'Error',
        description: `${JSON.parse(state.error)[0].message}`,
        variant: 'destructive',
      })
    } else if (state?.success) {
      toast({
        title: 'Success',
        description: 'Password changed successfully',
        variant: 'success',
      })
    }
  }, [state])

  return (
    <form action={formAction}>
      <Label htmlFor="password" className="text-xl">
        Change password
      </Label>
      <p className="text-sm text-muted-foreground">
        Used to sign you into your account
      </p>
      <div className="mt-4 flex flex-col gap-2">
        <Input
          id="password"
          type="password"
          placeholder="Enter new password"
          name="newPassword"
          required
        />
        <p className="text-xs text-muted-foreground">
          Password must be at least 8 characters long
        </p>
        <ChangePasswordSubmitButton />
      </div>
    </form>
  )
}
