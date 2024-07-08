'use client'
import React from 'react'
import UseFormStatusPendingButton from './UseFormStatusPendingButton'

export default function DeleteItemListEditorDialog() {
  return (
    <UseFormStatusPendingButton
      text="Delete item from library"
      style="mt-4 w-fit max-sm:w-[50vw]"
      variant="destructive"
    />
  )
}
