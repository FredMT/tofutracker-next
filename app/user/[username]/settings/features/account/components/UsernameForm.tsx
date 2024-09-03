'use client'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import { Profile } from '@prisma/client'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { updateUsernameAction } from '@/app/user/[username]/settings/features/account/components/actions'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { useServerAction } from 'zsa-react'
import { useToast } from '@/components/ui/use-toast'
import { useRouter } from '@/hooks/useRouter'

const formSchema = z.object({
  username: z
    .string()
    .min(4, 'Username cannot be less than 4 characters')
    .max(12, 'Username cannot exceed 12 characters')
    .refine((s) => !s.includes(' '), 'Username cannot contain spaces'),
})

export default function UsernameForm({ profile }: { profile: Profile }) {
  const { execute, isPending } = useServerAction(updateUsernameAction)
  const router = useRouter()
  const { toast } = useToast()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: profile?.username || '',
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const [data, error] = await execute({ username: values.username })
    if (error) {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      })
    } else {
      router.push(`/user/${data.username}/settings`)
      toast({
        title: 'Error',
        description: 'Username updated successfully',
        variant: 'success',
      })
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Username</CardTitle>
        <CardDescription>
          Update your username to be displayed on your profile.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input
                      placeholder={profile?.username ?? 'johndoe'}
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    This is your public display name.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              disabled={
                form.formState.isSubmitting ||
                !form.formState.isValid ||
                form.watch('username') === profile?.username
              }
            >
              Save
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
