'use client'
import { Button } from '@/components/ui/button'
import React from 'react'
import { useFormStatus } from 'react-dom'

export default function ChangePasswordSubmitButton() {
  const { pending } = useFormStatus()
  return pending ? (
    <Button variant="secondary" className="w-20">
      <div className="h-5 w-5 animate-spin rounded-full border-b-2 border-white"></div>
    </Button>
  ) : (
    <Button
      variant="secondary"
      className="w-20"
      type="submit"
      disabled={pending}
    >
      Save
    </Button>
  )
}
