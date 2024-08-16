'use client'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form'
import { useToast } from '@/components/ui/use-toast'
import { Check } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { changeWatchStatus } from './actions'

export function WatchStatusSelect({
  userId,
  mediaId,
  data,
}: {
  userId: number
  mediaId: string
  data: any
}) {
  const { toast } = useToast()
  const watchStatus = data ? data.watch_status : null

  const form = useForm({
    defaultValues: {
      userId,
      mediaId,
      watchStatus: watchStatus || '',
      addPlay: false,
    },
  })

  const onSubmit = async (values: any) => {
    const formData = new FormData()
    Object.entries(values).forEach(([key, value]) => {
      formData.append(key, String(value))
    })

    const result = await changeWatchStatus(null, formData)
    if (result.success) {
      toast({
        title: 'Success',
        description: result.message,
        variant: 'success',
      })
    } else {
      toast({
        title: 'Error',
        description: result.message,
        variant: 'destructive',
      })
    }
  }

  const getDisplayStatus = (status: string | null) => {
    switch (status) {
      case 'COMPLETED':
        return 'Completed'
      case 'PLANNING':
        return 'Plan to Watch'
      case 'ONHOLD':
        return 'On Hold'
      case 'DROPPED':
        return 'Dropped'
      case 'WATCHING':
        return 'Watching'
      case 'REWATCHING':
        return 'Rewatching'
      default:
        return 'Choose Status'
    }
  }

  const handleStatusChange = (newStatus: string, addPlay: boolean = false) => {
    form.setValue('watchStatus', newStatus)
    form.setValue('addPlay', addPlay)
    form.handleSubmit(onSubmit)()
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="watchStatus"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="w-full justify-start">
                      {getDisplayStatus(watchStatus)}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56">
                    <DropdownMenuLabel>Watch Status</DropdownMenuLabel>
                    {data === null ? (
                      <DropdownMenuItem
                        onSelect={() => handleStatusChange('COMPLETED', true)}
                      >
                        <div className="flex items-center">
                          <div className="mr-2 h-4 w-4">
                            {watchStatus === status && (
                              <Check className="h-4 w-4" />
                            )}
                          </div>
                          <span>Completed</span>
                        </div>
                      </DropdownMenuItem>
                    ) : (
                      <DropdownMenuSub>
                        <DropdownMenuSubTrigger>
                          <div className="flex items-center">
                            <div className="mr-2 h-4 w-4">
                              {watchStatus === 'COMPLETED' && (
                                <Check className="h-4 w-4" />
                              )}
                            </div>
                            <span>Completed</span>
                          </div>
                        </DropdownMenuSubTrigger>
                        <DropdownMenuSubContent>
                          <DropdownMenuItem
                            onSelect={() =>
                              handleStatusChange('COMPLETED', false)
                            }
                          >
                            Set Status
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onSelect={() =>
                              handleStatusChange('COMPLETED', true)
                            }
                          >
                            Also add a Play
                          </DropdownMenuItem>
                        </DropdownMenuSubContent>
                      </DropdownMenuSub>
                    )}

                    {['PLANNING', 'ONHOLD', 'DROPPED'].map((status) => (
                      <DropdownMenuItem
                        key={status}
                        onSelect={() => handleStatusChange(status)}
                      >
                        <div className="flex items-center">
                          <div className="mr-2 h-4 w-4">
                            {watchStatus === status && (
                              <Check className="h-4 w-4" />
                            )}
                          </div>
                          <span>{getDisplayStatus(status)}</span>
                        </div>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </FormControl>
            </FormItem>
          )}
        />
      </form>
    </Form>
  )
}
