import Image from 'next/image'
import React from 'react'
import { Season } from '@/types/tv'
import MobileButtons from '@/app/(content)/components/shared/MobileButtons'

type EpisodeData = {
  name: string
  id: number
  episode_number: number
  air_date: string
  runtime: string
  overview: string
  still_path: string
}

export default async function Poster({
  poster_path,
  title,
  itemId,
  type,
  seasons,
  seasonId,
  isAnime = false,
}: {
  poster_path: string
  title: string
  itemId: string
  type: string
  seasons?: Season[]
  seasonId?: number
  isAnime?: boolean
}) {
  return (
    <div className="flex flex-col gap-y-6" id="poster">
      <div className="sticky top-6">
        <Image
          className="mb-6 h-[186px] max-w-[124px] rounded-sm border border-muted object-cover sm:h-[273px] sm:min-w-[182px] md:h-[336px] md:min-w-[224px]"
          src={`https://image.tmdb.org/t/p/original${poster_path}`}
          alt={title}
          width={600}
          height={900}
          priority
        />
        <div className="hidden gap-y-4 sm:flex sm:flex-col">
          <MobileButtons
            itemId={itemId + `${type === 'tv' ? '2' : ''}`}
            title={title}
            seasons={seasons}
            type={type}
            seasonId={seasonId}
            isAnime={isAnime ? true : false}
          />
        </div>
      </div>
    </div>
  )
}
