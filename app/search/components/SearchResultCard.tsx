import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import { format } from 'date-fns'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

type SearchResultCardProps = {
  id: number
  media_type: string
  title: string
  overview: string
  poster_path: string
  backdrop_path: string
  popularity: number
  vote_average: number
  vote_count: number
  release_date: string
  first_air_date: string | null
  origin_country: string[]
  genres: {
    id: number
    name: string
  }[]
}

export default function SearchResultCard({
  data,
}: {
  data: SearchResultCardProps
}) {
  return (
    <Card className="max-h-[176px] w-full overflow-hidden border-0">
      <div className="flex space-x-4">
        <div className="relative">
          <Link href={`/${data.media_type}/${data.id}`}>
            <Image
              src={
                data.poster_path
                  ? `https://image.tmdb.org/t/p/w500${data.poster_path}`
                  : `https://placehold.co/300x450/webp?text=${data.title.replaceAll(' ', '+')}`
              }
              alt={data.title}
              width={500}
              height={750}
              className="aspect-poster max-h-[176px] min-h-[86px] min-w-[57px] max-w-[117px] rounded-sm"
            />
            {data.vote_average && (
              <div className="absolute right-1 top-1">
                <Badge className="border-0 bg-gradient-to-r from-[#90CEA1] via-[#3CBEC9] to-[#00B3E5] text-black">
                  <div>{`${data.vote_average.toFixed(1)}`}</div>
                </Badge>
              </div>
            )}
          </Link>
        </div>
        <div className="flex flex-col gap-y-2 py-3">
          <Link href={`/${data.media_type}/${data.id}`}>
            <div className="text-sm font-medium md:text-base lg:text-lg xl:text-xl">
              <div className="leading-5">
                {data.title && data.title}
                {data.release_date && format(data.release_date, ' (yyyy)')}
                {data.first_air_date && format(data.first_air_date, ' (yyyy)')}
              </div>
            </div>
          </Link>
          {data.genres.length > 0 && (
            <div className="mt-1 flex flex-wrap gap-2">
              {data.genres.map((genre) => (
                <Badge
                  key={genre.id}
                  className="border-[1px] border-black dark:border-white"
                  variant="outline"
                >
                  {genre.name}
                </Badge>
              ))}
            </div>
          )}
          <div className="flex h-full flex-col justify-evenly space-y-2">
            {data.overview && (
              <div className="line-clamp-3 overflow-hidden text-xs sm:text-sm lg:text-base">
                {data.overview}
              </div>
            )}
          </div>
        </div>
      </div>
    </Card>
  )
}
