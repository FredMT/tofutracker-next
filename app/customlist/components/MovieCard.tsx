import React from 'react'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Minus } from 'lucide-react'
import Image from 'next/image'
import { Movie } from '@/app/customlist/types'

interface MovieCardProps {
  movie: Movie
  isEditMode: boolean
  onRemove: (id: number) => void
}

const MovieCard: React.FC<MovieCardProps> = ({
  movie,
  isEditMode,
  onRemove,
}) => {
  return (
    <div className="relative border-0">
      <Card className="border-0">
        {/* <Link href={`/movie/${movie.id}`}> */}
        <div className="relative">
          <Image
            className="aspect-poster h-full w-full rounded-sm object-cover"
            src={movie.poster}
            alt={movie.title}
            width={500}
            height={750}
            sizes="100vw"
          />
          <div className="absolute right-1 top-1">
            {movie.rating > 0 && (
              <Badge className="border-0 bg-gradient-to-r from-[#90CEA1] via-[#3CBEC9] to-[#00B3E5] text-black">
                <div>{`${movie.rating.toFixed(1)}`}</div>
              </Badge>
            )}
          </div>
        </div>
        {/* </Link> */}
        <div className="mt-4 flex flex-col gap-y-2">
          {/* <Link href={`/movie/${movie.id}`}> */}
          <h3 className="line-clamp-2 text-[14px] font-semibold leading-6 text-secondary-foreground">
            {movie.title}
          </h3>
          <div className="text-xs text-muted-foreground">{movie.year}</div>
          {/* </Link> */}
        </div>
      </Card>
      {isEditMode && (
        <Button
          size="icon"
          variant="destructive"
          className="absolute -right-4 -top-4 z-50 h-8 w-8 rounded-full"
          onClick={() => onRemove(movie.id)}
        >
          <Minus className="h-4 w-4" />
        </Button>
      )}
    </div>
  )
}

export default MovieCard
