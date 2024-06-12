'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useState } from 'react'
import { useFormStatus } from 'react-dom'
import { z } from 'zod'

const usernameSchema = z
  .string()
  .min(3, { message: 'Username must be at least 3 characters long' })
  .max(20, { message: 'Username must not exceed 20 characters' })
  .regex(/^[a-zA-Z0-9_]+$/, {
    message:
      'Username can only contain alphanumeric characters and underscores',
  })

export default function UsernameChange({
  user_id,
  updateUsername,
}: {
  user_id: string
  updateUsername: (formData: FormData) => Promise<boolean>
}) {
  const status = useFormStatus()
  const [username, setUsername] = useState('')
  const [error, setError] = useState<string | null>(null)

  function handleUsernameChange(e: React.ChangeEvent<HTMLInputElement>) {
    setUsername(e.target.value)
    setError(null)
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    try {
      usernameSchema.parse(username)
      const formData = new FormData()
      formData.append('user_id', user_id)
      formData.append('newUsername', username)
      await updateUsername(formData)
    } catch (error) {
      if (error instanceof z.ZodError) {
        setError(error.errors[0].message)
      }
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col gap-2">
        <input type="hidden" name="user_id" value={user_id} />
        <Input
          id="username"
          type="text"
          value={username}
          name="newUsername"
          onChange={handleUsernameChange}
          placeholder="Enter your new username"
        />
        {error && <p className="text-red-500">{error}</p>}
        <Button variant="secondary" className="w-20" type="submit">
          Save
        </Button>
      </div>
    </form>
  )
}
