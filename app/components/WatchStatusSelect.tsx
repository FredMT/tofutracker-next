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
import {
  changeAnimeMovieWatchStatus,
  changeWatchStatus,
  changeWatchStatusAnimeTv,
  changeWatchStatusAnimeTvSeason,
  changeWatchStatusTv,
  changeWatchStatusTvSeason,
} from './actions'

export function WatchStatusSelect({
  userId,
  mediaId,
  data,
  isMovie,
  type,
  seasonId,
}: {
  userId: number
  mediaId: string
  data: any
  isMovie: boolean
  type: string
  seasonId?: number
}) {
  const { toast } = useToast()
  const watchStatus = data ? data.watch_status : null

  const form = useForm({
    defaultValues: {
      userId,
      mediaId,
      watchStatus: watchStatus || '',
      addPlay: false,
      seasonId: seasonId || null,
    },
  })

  const onSubmit = async (values: any) => {
    const formData = new FormData()
    Object.entries(values).forEach(([key, value]) => {
      formData.append(key, String(value))
    })

    const result =
      type === 'movie'
        ? await changeWatchStatus(null, formData)
        : type === 'season'
          ? await changeWatchStatusTvSeason(null, formData)
          : type === 'animetv'
            ? await changeWatchStatusAnimeTv(null, formData)
            : type === 'animetvseason'
              ? await changeWatchStatusAnimeTvSeason(null, formData)
              : type === 'animemovie'
                ? await changeAnimeMovieWatchStatus(null, formData)
                : await changeWatchStatusTv(null, formData)
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
      default:
        return 'Choose Status'
    }
  }

  const handleStatusChange = (newStatus: string, addPlay: boolean = false) => {
    form.setValue('watchStatus', newStatus)
    {
      type === 'movie' && form.setValue('addPlay', addPlay)
    }
    {
      type === 'season' ||
        (type === 'animetvseason' &&
          seasonId &&
          form.setValue('seasonId', seasonId))
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
                    <Button variant="outline" className="w-full justify-center">
                      Status: {getDisplayStatus(watchStatus)}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56">
                    <DropdownMenuLabel>Watch Status</DropdownMenuLabel>
                    {['COMPLETED', 'PLANNING', 'ONHOLD', 'DROPPED'].map(
                      (status) => (
                        <DropdownMenuItem
                          key={status}
                          onSelect={() => handleStatusChange(status)}
                          disabled={data && data.watch_status === status}
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
