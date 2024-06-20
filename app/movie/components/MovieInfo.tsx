import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import React from 'react'
import { format, formatDuration, intervalToDuration } from 'date-fns'

function humanDuration(time: number) {
  return formatDuration(intervalToDuration({ start: 0, end: time * 1000 }))
}

type MovieInfoProps = {
  vote_average: number
  release_date: string
  runtime: number
  language: string
  certification: string
}

export default async function MovieInfo({
  vote_average,
  release_date,
  runtime,
  language,
  certification,
}: MovieInfoProps) {
  const releaseDateDisplay = format(new Date(release_date), 'PPP')
  const humanRuntime = humanDuration(runtime * 60)
    .replace(' hours', 'h')
    .replace(' minutes', 'm')

  const newlanguage = new Intl.DisplayNames(['en'], { type: 'language' }).of(
    language
  )

  return (
    <Card className="mt-6 w-full rounded-none border-x-0 border-y-2" id="info">
      <CardContent className="px-5 py-[18px]">
        <div className="flex flex-wrap justify-center gap-x-6 gap-y-4 sm:justify-start">
          <Badge className="dark:bg-transparent dark:text-white dark:ring-1 dark:ring-white">
            {vote_average}
          </Badge>
          <div className="text-[12px] font-medium not-italic leading-[20px]">
            {releaseDateDisplay}
          </div>
          <div className="text-[12px] font-medium not-italic leading-[20px]">
            {humanRuntime}
          </div>
          <div className="text-[12px] font-medium not-italic leading-[20px]">
            {newlanguage}
          </div>
          <div className="text-[12px] font-medium not-italic leading-[20px]">
            {certification}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
