'use client'
import { Button } from '@/components/ui/button'
import DatetimePickerForm from '@/components/ui/datetime-picker-form'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { useToast } from '@/components/ui/use-toast'
import {
  watchRemainingAction,
  watchRemainingActionTvAnime,
  watchRemainingActionTvSeason,
} from './actions'

type WatchRemainingButtonProps = {
  userId: number
  mediaId: number
  type: string
  seasonId?: number
}

export default function WatchRemainingButton({
  userId,
  mediaId,
  type,
  seasonId,
}: WatchRemainingButtonProps) {
  const { toast } = useToast()
  const handleDatetimeSubmit = async (formData: FormData) => {
    const result = await watchRemainingAction(formData)
    toast({
      title: result.success ? 'Success' : 'Error',
      description: result.message,
      variant: result.success ? 'success' : 'destructive',
    })
  }

  const handleNowClick = async () => {
    const formData = new FormData()
    {
      type !== 'season' && formData.append('userId', userId.toString())
    }
    formData.append('mediaId', mediaId.toString())
    formData.append('datetime', new Date().toISOString())
    {
      type === 'season' &&
        seasonId &&
        formData.append('seasonId', seasonId.toString())
    }

    const result =
      type === 'season'
        ? await watchRemainingActionTvSeason(formData)
        : type === 'animetv'
          ? await watchRemainingActionTvAnime(formData)
          : await watchRemainingAction(formData)
    toast({
      title: result.success ? 'Success' : 'Error',
      description: result.message,
      variant: result.success ? 'success' : 'destructive',
    })
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button className="w-full justify-center" variant="outline">
          Watch Remaining
        </Button>
      </PopoverTrigger>
      <PopoverContent className="max-sm: max-h-[var(--radix-popover-content-available-height)] max-sm:w-[var(--radix-popover-trigger-width)]">
        <div className="flex justify-evenly space-x-4 p-4">
          {type !== 'animetv' && type !== 'animetvseason' && (
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-1/2">
                  Choose date
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto" align="start" side="bottom">
                <DatetimePickerForm
                  serverAction={handleDatetimeSubmit}
                  userId={userId.toString()}
                  mediaId={mediaId.toString()}
                />
              </PopoverContent>
            </Popover>
          )}
          <Button
            className="w-1/2 justify-center"
            variant="outline"
            onClick={handleNowClick}
          >
            Now
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  )
}
