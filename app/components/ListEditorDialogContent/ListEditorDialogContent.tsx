'use client'

import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import DeleteItemListEditorDialog from '../DeleteItemListEditorDialog'
import UseFormStatusPendingButton from '../UseFormStatusPendingButton'
import { useFormState } from 'react-dom'
import { updateUserMediaStatus } from '../actions'
import { useToast } from '@/components/ui/use-toast'
import StatusSelect from './StatusSelect'
import RatingSelect from './RatingSelect'
import DatePicker from './DatePicker'
import TotalRewatchesInput from './TotalRewatchesInput'
import { format, parseISO } from 'date-fns'

type UserMediaStatus = {
  id: number
  user_id: string
  media_id: number
  progress: number
  watch_count: number
  last_watched_date: string
  last_watched_episode_id: number | null
  created_at: string
  updated_at: string
  watch_status:
    | 'COMPLETED'
    | 'PLANTOWATCH'
    | 'WATCHING'
    | 'REWATCHING'
    | 'DROPPED'
  score: number | null
  start_date: string
  finish_date: string
}

export default function ListEditorDialogContent({
  data,
}: {
  data: UserMediaStatus | null
}) {
  const { toast } = useToast()
  const [progress, setProgress] = useState<number>(data?.progress ?? 0)

  const [startDate, setStartDate] = useState<Date | undefined>(
    data?.start_date ? parseISO(data.start_date) : new Date()
  )
  const [finishDate, setFinishDate] = useState<Date | undefined>(
    data?.finish_date ? parseISO(data.finish_date) : new Date()
  )
  const [status, setStatus] = useState<string>(
    data?.watch_status ?? 'COMPLETED'
  )
  const [rate, setRate] = useState<number | null>(data?.score ?? null)
  const [totalRewatches, setTotalRewatches] = useState<number>(
    data?.watch_count ? data.watch_count : 0
  )
  const [state, formAction] = useFormState(updateUserMediaStatus, {
    error: undefined,
    success: false,
  })

  useEffect(() => {
    if (status === 'COMPLETED' || status === 'REWATCHING') {
      setProgress(100)
    } else if (status === 'DROPPED' && progress === 0) {
      // Only set to 0 if it was already 0
      setProgress(0)
    }
    // Don't change progress for other statuses or if DROPPED with progress > 0
  }, [status, progress])

  useEffect(() => {
    state.error && toast({ title: state.error, variant: 'destructive' })
    state.success &&
      toast({ title: 'Item added to library', variant: 'success' })
  }, [state, toast])

  const pathname = usePathname()
  const isMovie = pathname.split('/')[1] === 'movie'
  const mediaId = isMovie
    ? parseInt(pathname.split('/')[2]) + '1'
    : parseInt(pathname.split('/')[2]) + '2'

  const handleDateChange = (date: Date | undefined, isStartDate: boolean) => {
    if (isMovie) {
      setStartDate(date)
      setFinishDate(date)
    } else {
      if (isStartDate) {
        setStartDate(date)
        // If finish date is before new start date, update finish date
        if (finishDate && date && finishDate < date) {
          setFinishDate(date)
        }
      } else {
        setFinishDate(date)
      }
    }
  }

  return (
    <>
      <form action={formAction}>
        <input type="hidden" name="mediaId" value={mediaId} />
        <input type="hidden" name="watchStatus" value={status} />
        <input type="hidden" name="score" value={rate?.toString() ?? ''} />
        <input
          type="hidden"
          name="totalRewatches"
          value={totalRewatches.toString()}
        />
        <input
          type="hidden"
          name="startDate"
          value={startDate ? format(startDate, "yyyy-MM-dd'T'HH:mm:ssxxx") : ''}
        />
        <input
          type="hidden"
          name="finishDate"
          value={
            finishDate ? format(finishDate, "yyyy-MM-dd'T'HH:mm:ssxxx") : ''
          }
        />
        <input type="hidden" name="progress" value={progress.toString()} />

        <div className="flex flex-wrap gap-4">
          <StatusSelect status={status} setStatus={setStatus} />
          <RatingSelect rate={rate} setRate={setRate} />
          {!isMovie && (
            <DatePicker
              label="Start Date"
              date={startDate}
              onDateChange={(date) => handleDateChange(date, true)}
              isStartDate={true}
              isMovie={isMovie}
            />
          )}
          <DatePicker
            label={isMovie ? 'Watch Date' : 'Finish Date'}
            date={finishDate}
            onDateChange={(date) => handleDateChange(date, false)}
            isStartDate={false}
            isMovie={isMovie}
            startDate={startDate}
          />
          <TotalRewatchesInput
            totalRewatches={totalRewatches}
            setTotalRewatches={setTotalRewatches}
          />
        </div>

        <UseFormStatusPendingButton
          text={`${data ? 'Update' : 'Save'}`}
          style="mt-4 w-fit max-sm:w-fit "
          variant="default"
        />
      </form>
      <DeleteItemListEditorDialog isInLibrary={Boolean(data)} />
    </>
  )
}
