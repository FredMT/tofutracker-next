import { Card } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

type Seasons = {
  id: number
  show_id: number
  name: string
  overview?: string
  poster_path?: string
  season_number: number
  rating: number
  episode_count: number
  air_date: string
}

export default function Seasons({ seasons }: { seasons: Seasons[] }) {
  return (
    <div className="mt-6 flex flex-wrap gap-x-3">
      {seasons.map((show: Seasons) => (
        <Card
          key={show.id}
          className="min-h-[260px] min-w-[112px] border-0 sm:min-h-[302px] sm:min-w-[140px]"
        >
          <div className="relative">
            <Link
              href={`/tv/${Math.floor(show.show_id / 10)}/season/${show.season_number}`}
            >
              <Image
                className="h-[210px] w-[140px] rounded-sm object-cover"
                src={
                  show.poster_path
                    ? `https://image.tmdb.org/t/p/w440_and_h660_face${show.poster_path}`
                    : `https://placehold.co/440x660?text=${show.name.replaceAll(' ', '+')}`
                }
                alt={show.name}
                width={112}
                height={168}
              />
            </Link>
          </div>
          <div className="flex flex-col">
            <h3 className="mt-2 line-clamp-2 text-[14px] font-semibold leading-6 text-secondary-foreground">
              {show.name}
            </h3>
            <span className="flex gap-1 text-xs text-muted-foreground">
              <div>
                {show.air_date && <p>{`${show.air_date.split('-')[0]}`}</p>}
              </div>
              <div>{show.rating > 0 && <p>{`• ${show.rating}`}</p>}</div>
            </span>
          </div>
        </Card>
      ))}
      <Separator className="my-2" />
    </div>
  )
}
