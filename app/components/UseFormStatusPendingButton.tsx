'use client'
import { Button } from '@/components/ui/button'
import React, { useEffect } from 'react'
import { useFormStatus } from 'react-dom'

export default function UseFormStatusPendingButton({
  text,
  style,
  variant = 'secondary',
  disabled = false,
  component,
}: {
  text: string
  style?: string
  variant?:
    | 'default'
    | 'destructive'
    | 'outline'
    | 'secondary'
    | 'link'
    | 'ghost'
  disabled?: boolean
  component?: React.ReactNode
}) {
  const { pending } = useFormStatus()

  return pending ? (
    <Button variant={variant} className={style}>
      <div
        className={`h-5 w-5 animate-spin rounded-full border-b-2 ${variant === 'secondary' ? 'border-white' : 'border-black'}`}
      ></div>
    </Button>
  ) : (
    <>
      <Button
        variant={variant}
        className={style}
        type="submit"
        disabled={disabled}
      >
        <div className="flex flex-row items-center justify-center">
          {component}
          {text}
        </div>
      </Button>
    </>
  )
}
