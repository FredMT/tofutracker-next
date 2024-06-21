import { Card } from './ui/card'
import Image from 'next/image'
import Link from 'next/link'
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
  HoverCardPortal,
} from '@/components/ui/hover-card'
import MovieCardHoverCard from './MovieCardHoverCard'

type Item = {
  year: string
  rating: number
  item: any
}

export default function MovieCard({ year, rating, item }: Item) {
  return (
    <Card className="min-h-[260px] min-w-[112px] border-0 sm:min-h-[302px] sm:min-w-[140px]">
      <Link href={`/${item.media_type}/${item.id}`}>
        <div>
          <HoverCard openDelay={150} closeDelay={0}>
            <HoverCardTrigger asChild>
              <Image
                className="w-full rounded-sm object-cover lg:h-[210px] lg:w-[140px]"
                src={
                  item.media_type !== 'anime'
                    ? `https://image.tmdb.org/t/p/w440_and_h660_face${item.poster_path}`
                    : `https://tofutrackeranime2.b-cdn.net/posters/${item.poster}`
                }
                alt={item.title}
                width={112}
                height={168}
                priority
                sizes="100vw"
              />
            </HoverCardTrigger>
            <HoverCardPortal container={document.body}>
              <HoverCardContent className="h-[300px] w-[400px] border-0 bg-transparent backdrop-blur-lg">
                <MovieCardHoverCard item={item} year={year} rating={rating} />
              </HoverCardContent>
            </HoverCardPortal>
          </HoverCard>
        </div>
      </Link>
      <div className="mt-4 flex flex-col gap-y-2">
        <Link href={`/${item.media_type}/${item.id}`}>
          <h3 className="line-clamp-2 text-[14px] font-semibold leading-6 text-secondary-foreground">
            {item.title}
          </h3>
        </Link>

        <span className="flex gap-1 text-xs text-muted-foreground">
          <div>{year && <p>{`${year}`}</p>}</div>
          <div>{rating > 0 && <p>{`• ${rating}`}</p>}</div>
        </span>
      </div>
    </Card>
  )
}
