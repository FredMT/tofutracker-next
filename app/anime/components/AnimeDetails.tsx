import { Card } from '@/components/ui/card'
import Link from 'next/link'
import { format } from 'date-fns'

import React from 'react'

type AnimeDetailsProps = {
  anime: {
    id: number
    url: string
    type: string
    title: string
    poster: string
    rating: number
    end_date: string
    identifier: string
    start_date: string
    description: string
    korean_title: string
    chinese_title: string
    english_title: string
    episode_count: number
    japanese_title: string
  }
  creators: AnimeCreator[]
}

type AnimeCreator = {
  id: number
  name: string
  type: string
  anime_id: number
}

export default function AnimeDetails({ anime, creators }: AnimeDetailsProps) {
  const details = [
    { label: 'Title', value: anime.title },
    { label: 'Japanese Title', value: anime.japanese_title },
    { label: 'English Title', value: anime.english_title },
    { label: 'Korean Title', value: anime.korean_title },
    { label: 'Chinese Title', value: anime.chinese_title },
    { label: 'Start Date', value: format(new Date(anime.start_date), 'PPP') },
    { label: 'End Date', value: format(new Date(anime.end_date), 'PPP') },
    { label: 'URL', value: anime.url, isLink: true },
  ]

  return (
    <Card
      className="min-h-[380px] rounded-none border-x-0 border-t-0 pb-8"
      id="details"
    >
      <div className="mt-4 grid grid-cols-[75px_auto] gap-y-2 lg:grid-cols-[75px_1fr_75px_1fr] lg:gap-y-4">
        {details.map(
          ({ label, value, isLink }) =>
            value && (
              <React.Fragment key={label}>
                <div className="text-[14px] font-medium leading-[24px] text-muted-foreground">
                  {label}
                </div>
                <div className="ml-6 text-[14px] font-medium leading-[24px]">
                  {isLink ? (
                    <Link
                      href={value}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {value}
                    </Link>
                  ) : (
                    value
                  )}
                </div>
              </React.Fragment>
            )
        )}
      </div>
    </Card>
  )
}
