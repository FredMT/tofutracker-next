'use client'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { useToast } from '@/components/ui/use-toast'
import { useState } from 'react'
import Rating from '@/app/(content)/features/Rate/components/Rating'
import { rateMediaAction } from '@/app/(content)/features/Rate/controller'
import { useServerAction } from 'zsa-react'

type Props = {
  mediaId: string
  data: any
  title: string
  type: 'movie' | 'tv' | 'season' | 'animetv' | 'animemovie' | 'animetvseason'
  seasonId?: number
}

export default function RateButton({
  mediaId,
  data,
  title,
  type,
  seasonId,
}: Props) {
  const [rating, setRating] = useState(data?.rating || 0)
  const [open, setOpen] = useState(false)
  const { toast } = useToast()
  const { execute, isPending } = useServerAction(rateMediaAction)

  const getStarSize = (rating: number | null): number => {
    if (!rating) return 80
    return 80 + rating * 4
  }

  const starSize = getStarSize(rating)

  const handleSubmit = async () => {
    const [data, err] = await execute({
      type,
      mediaId,
      rating,
      seasonId: seasonId?.toString(),
    })

    if (err) {
      toast({
        title: 'Error',
        description: err.message,
        variant: 'destructive',
      })
    } else if (data) {
      toast({
        title: 'Success',
        description: `You've given ${title} a rating of ${rating}`,
        variant: 'success',
      })
      setOpen(false)
    }
  }

  const buttonText = data?.rating ? `Your rating: ${data.rating}` : 'Rate'

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" disabled={isPending}>
          {buttonText}
        </Button>
      </DialogTrigger>
      <DialogContent className="relative">
        <div
          className="absolute left-1/2 -translate-x-1/2"
          style={{ top: `calc(-${starSize / 2}px)` }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={starSize}
            height={starSize}
            viewBox="0 0 24 24"
            fill="currentColor"
            className="text-purple-400"
          >
            <path
              d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
              stroke="currentColor"
              strokeWidth="1"
              strokeLinejoin="round"
              strokeLinecap="round"
            />
            <text
              x="50%"
              y="55%"
              dominantBaseline="middle"
              textAnchor="middle"
              fill="black"
              fontSize="8"
              fontWeight="bold"
            >
              {rating === 0 ? '?' : rating}
            </text>
          </svg>
        </div>
        <DialogHeader className="mt-8">
          <DialogTitle className="text-center text-lg font-medium">
            Rate{' '}
            {type === 'movie' || type === 'animemovie' ? 'Movie' : 'TV Show'}
          </DialogTitle>
          <DialogDescription className="text-center text-muted-foreground">
            Rate this{' '}
            {type === 'movie' || type === 'animemovie' ? 'movie' : 'TV show'}
          </DialogDescription>
        </DialogHeader>
        <div>
          <Rating precision={1} totalStars={10} onRatingChange={setRating} />
        </div>
        <DialogFooter className="flex w-full flex-row justify-center sm:justify-center">
          <Button onClick={handleSubmit} disabled={isPending} className="w-1/3">
            {isPending ? 'Rating...' : 'Rate'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
