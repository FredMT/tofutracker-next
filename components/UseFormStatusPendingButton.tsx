'use client'
import { Button } from '@/components/ui/button'
import React from 'react'
import { useFormStatus } from 'react-dom'

export default function UseFormStatusPendingButton({
  text,
  style,
}: {
  text: string
  style?: string
}) {
  const { pending } = useFormStatus()
  return pending ? (
    <Button variant="secondary" className="w-20">
      <div
        className={`h-5 animate-spin rounded-full border-b-2 border-white ${style}`}
      ></div>
    </Button>
  ) : (
    <Button
      variant="secondary"
      className={style}
      type="submit"
      disabled={pending}
    >
      {text}
    </Button>
  )
}
