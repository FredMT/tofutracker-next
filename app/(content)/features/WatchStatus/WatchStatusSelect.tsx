'use client'

import { changeWatchStatusAction } from '@/app/(content)/features/WatchStatus/controller'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form'
import { useToast } from '@/components/ui/use-toast'
import { Check } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { useServerAction } from 'zsa-react'

type WatchStatusType =
  | 'movie'
  | 'tv'
  | 'season'
  | 'animetv'
  | 'animemovie'
  | 'animetvseason'

export function WatchStatusSelect({
  mediaId,
  data,
  type,
  seasonId,
}: {
  mediaId: string
  data: any
  type: WatchStatusType
  seasonId?: number
}) {
  const { toast } = useToast()
  const watchStatus = data ? data.watch_status : null

  const { execute, isPending } = useServerAction(changeWatchStatusAction)

  const form = useForm({
    defaultValues: {
      type,
      mediaId,
      watchStatus: watchStatus || '',
      seasonId: seasonId?.toString() || null,
    },
  })

  const onSubmit = async (values: any) => {
    const [data, err] = await execute({
      type,
      mediaId: values.mediaId,
      watchStatus: values.watchStatus,
      seasonId: values.seasonId || '',
    })

    if (err) {
      toast({
        title: 'Error',
        description: err.message,
        variant: 'destructive',
      })
    } else if (data) {
      toast({
        title: 'Success',
        description: 'Watch status updated succesfully',
        variant: 'success',
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
      default:
        return 'Choose Status'
    }
  }

  const handleStatusChange = (newStatus: string) => {
    form.setValue('watchStatus', newStatus)
    if ((type === 'season' || type === 'animetvseason') && seasonId) {
      form.setValue('seasonId', seasonId.toString())
    }
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
                    <Button
                      variant="outline"
                      className="w-full justify-center"
                      disabled={isPending}
                    >
                      {isPending
                        ? 'Updating...'
                        : `Status: ${getDisplayStatus(watchStatus)}`}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56">
                    <DropdownMenuLabel>Watch Status</DropdownMenuLabel>
                    {['COMPLETED', 'PLANNING', 'ONHOLD', 'DROPPED'].map(
                      (status) => (
                        <DropdownMenuItem
                          key={status}
                          onSelect={() => handleStatusChange(status)}
                          disabled={
                            isPending || (data && data.watch_status === status)
                          }
                          className="cursor-pointer"
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
                      )
                    )}
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
