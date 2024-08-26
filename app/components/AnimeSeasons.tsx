import { Card } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

interface AnimeInfo {
  id: number
  poster: string
  title: string
  season: string
  rating: number | null
}

interface RelatedAnimeData {
  main: AnimeInfo[]
  specials: AnimeInfo[]
}

function AnimeCard({ show, showId }: { show: AnimeInfo; showId: string }) {
  return (
    <Card
      key={show.id}
      className="min-h-[260px] max-w-[112px] border-0 sm:min-h-[302px] sm:max-w-[140px]"
    >
      <div className="relative">
        <Link href={`/anime/${showId}/season/${show.id}`}>
          <Image
            className="h-[210px] w-[140px] rounded-sm object-cover"
            src={
              show.poster
                ? `https://tofutrackeranime2.b-cdn.net/posters/${show.poster}`
                : `https://placehold.co/440x660?text=No+Image`
            }
            alt={`Anime ${show.id}`}
            width={112}
            height={168}
          />
        </Link>
      </div>
      <div className="flex flex-col">
        <h3 className="mt-2 line-clamp-2 text-[14px] font-semibold leading-6 text-secondary-foreground">
          {show.title}
        </h3>
        <span className="flex gap-1 text-xs text-muted-foreground">
          {show.season && (
            <div>
              <p>{show.season}</p>
            </div>
          )}
          <div>
            {show.rating !== null && <p>{`• ${show.rating.toFixed(2)}`}</p>}
          </div>
        </span>
      </div>
    </Card>
  )
}

export default function RelatedAnime({
  data,
  showId,
}: {
  data: RelatedAnimeData
  showId: string
}) {
  return (
    <div className="mt-6 space-y-6">
      <div className="flex flex-wrap gap-x-3">
        {data.main.map((show) => (
          <AnimeCard key={show.id} show={show} showId={showId} />
        ))}
      </div>

      {data.specials.length > 0 && (
        <div>
          <h2 className="mb-3 text-lg font-semibold">Specials</h2>
          <div className="flex flex-wrap gap-x-3">
            {data.specials.map((show) => (
              <AnimeCard key={show.id} show={show} showId={showId} />
            ))}
          </div>
          <Separator className="my-4" />
        </div>
      )}
    </div>
  )
}
