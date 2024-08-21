import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import React from 'react'

type MovieInfoProps = {
  vote_average: number
  release_date: string
  runtime?: number
  language: string
  certification: string
  networks?: any
  country?: string
}

export default async function MovieInfo({
  vote_average,
  release_date,
  runtime,
  language,
  certification,
  networks,
  country,
}: MovieInfoProps) {
  return (
    <Card className="mt-6 w-full rounded-none border-x-0 border-y-2" id="info">
      <CardContent className="px-5 py-[18px]">
        <div className="flex flex-wrap justify-center gap-x-6 gap-y-4 sm:justify-start">
          <Badge className="dark:bg-transparent dark:text-white dark:ring-1 dark:ring-white">
            {vote_average.toFixed(2)}
          </Badge>
          {release_date && (
            <div className="text-[12px] font-medium not-italic leading-[20px]">
              {release_date}
            </div>
          )}
          <div className="text-[12px] font-medium not-italic leading-[20px]">
            {runtime}
          </div>
          <div className="text-[12px] font-medium capitalize not-italic leading-[20px]">
            {language}
          </div>
          <div className="text-[12px] font-medium not-italic leading-[20px]">
            {certification}
          </div>
          {country && (
            <div className="text-[12px] font-medium not-italic leading-[20px]">
              {country}
            </div>
          )}
          {networks && (
            <div className="flex flex-wrap items-center gap-x-2 gap-y-2">
              {networks.map((network: any) => (
                <img
                  key={network.id}
                  className="h-4"
                  src={`https://image.tmdb.org/t/p/original${network.logo_path}`}
                  alt={network.name}
                />
              ))}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
