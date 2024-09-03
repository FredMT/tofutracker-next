'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useServerAction } from 'zsa-react'
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { toast } from '@/components/ui/use-toast'
import { updateBioAction } from '@/app/user/[username]/settings/features/profile/components/actions'
import { Profile } from '@prisma/client'
import { AutosizeTextarea } from '@/components/autosize-textarea'

const formSchema = z.object({
  bio: z
    .string()
    .min(3, 'Bio must be 3 characters or more')
    .max(500, 'Bio must be 500 characters or less'),
})

type FormValues = z.infer<typeof formSchema>

export function UpdateBioForm({ profile }: { profile: Profile }) {
  const [isEditing, setIsEditing] = useState(false)
  const { execute, isPending } = useServerAction(updateBioAction)

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      bio: profile.bio,
    },
  })

  const onSubmit = async (values: FormValues) => {
    const [data, error] = await execute({ bio: values.bio })

    if (error) {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      })
    } else {
      toast({
        variant: 'success',
        title: 'Success',
        description: 'Your bio has been updated.',
      })
      setIsEditing(false)
    }
  }

  return (
    <div className="space-y-4">
      {!isEditing ? (
        <div className="space-y-2">
          <p className="text-sm text-gray-500">Bio</p>
          <p className="text-sm">{profile.bio || 'No bio set'}</p>
          <Button
            onClick={() => setIsEditing(true)}
            variant="outline"
            size="sm"
          >
            Edit Bio
          </Button>
        </div>
      ) : (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="bio"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Bio</FormLabel>
                  <FormControl>
                    <AutosizeTextarea
                      placeholder="Tell us about yourself"
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-end space-x-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsEditing(false)}
                disabled={isPending}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isPending}>
                {isPending ? 'Saving...' : 'Save'}
              </Button>
            </div>
          </form>
        </Form>
      )}
    </div>
  )
}
