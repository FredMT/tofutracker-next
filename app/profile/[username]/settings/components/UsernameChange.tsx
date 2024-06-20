'use client'
import React, { useEffect } from 'react'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import UseFormStatusPendingButton from '../../../../../components/UseFormStatusPendingButton'
import { updateUsername } from './actions'
import { useFormState } from 'react-dom'

export default function UsernameChange({ user_id }: { user_id: string }) {
  const [state, formAction] = useFormState(updateUsername, null)

  return (
    <form action={formAction}>
      <Label htmlFor="username" className="text-xl">
        Change username
      </Label>
      <p className="text-sm text-muted-foreground">
        Used to identify you on the platform
      </p>
      <div className="mt-4 flex flex-col gap-2">
        <input type="hidden" name="user_id" value={user_id} />
        <Input
          id="username"
          type="text"
          placeholder="Enter new username"
          name="newUsername"
          required
        />

        <p className="text-xs text-muted-foreground">
          Username must be at least 3 characters long and not exceed 16
          characters
        </p>
        <UseFormStatusPendingButton text="Save" style="w-20" />
      </div>
    </form>
  )
}
