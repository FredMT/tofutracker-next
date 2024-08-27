import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import Image from 'next/image'
import Link from 'next/link'

interface AnimeInfo {
  id: number
  poster: string
  title: string
  season: string
  rating: number | null
}

export default function AnimeCard({
  show,
  showId,
}: {
  show: AnimeInfo
  showId: string
}) {
  return (
    <Card
      key={show.id}
      className="min-h-[260px] max-w-[112px] border-0 sm:min-h-[302px] sm:max-w-[140px]"
    >
      <Link href={`/anime/${showId}/season/${show.id}`}>
        <div className="relative">
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
          <div className="absolute right-1 top-1">
            {show.rating !== null && (
              <Badge className="bg-[#30374F] text-[#F8A359]">
                <div>{`${show.rating.toFixed(1)}`}</div>
              </Badge>
            )}
          </div>
        </div>
      </Link>
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
        </span>
      </div>
    </Card>
  )
}
