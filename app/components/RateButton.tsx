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
import Rating from './Rating'
import { useState, useEffect, useRef } from 'react'
import { useFormState, useFormStatus } from 'react-dom'
import { rateMedia, rateMediaTv, rateMediaTvSeason } from './actions'

type Props = {
  userId: number
  mediaId: string
  data: any
  title: string
  isMovie: boolean
  type: string
  seasonId?: number
}

function SubmitButton() {
  const { pending } = useFormStatus()

  return (
    <Button type="submit" className="w-1/3" disabled={pending}>
      {pending ? 'Rating...' : 'Rate'}
    </Button>
  )
}

export default function RateButton({
  userId,
  mediaId,
  data,
  title,
  isMovie,
  type,
  seasonId,
}: Props) {
  const [rating, setRating] = useState(data?.rating || 0)
  const [open, setOpen] = useState(false)
  const [state, formAction] = useFormState(
    type === 'movie'
      ? rateMedia
      : type === 'season'
        ? rateMediaTvSeason
        : rateMediaTv,
    {
      success: false,
      message: '',
    }
  )
  const { toast } = useToast()
  const formSubmittedRef = useRef(false)
  const { pending } = useFormStatus()

  const getStarSize = (rating: number | null): number => {
    if (!rating) return 80 // Default size
    return 80 + rating * 4 // Increase size based on rating
  }

  const starSize = getStarSize(rating)

  const handleSubmit = (formData: FormData) => {
    {
      type !== 'season' && formData.append('user_id', userId.toString())
    }
    formData.append('media_id', mediaId)
    formData.append('rating', rating.toString())
    {
      type === 'season' &&
        seasonId &&
        formData.append('seasonId', seasonId.toString())
    }
    formSubmittedRef.current = true
    formAction(formData)
  }

  useEffect(() => {
    if (state.message && formSubmittedRef.current) {
      toast({
        variant: state.success ? 'success' : 'destructive',
        title: state.success ? 'Success' : 'Error',
        description: state.success
          ? `You've given ${title} a rating of ${rating}`
          : state.message,
      })
      if (state.success) {
        setOpen(false)
      }
      formSubmittedRef.current = false
    }
  }, [state, toast, title, rating])

  const buttonText = data?.rating ? `Your rating: ${data.rating}` : 'Rate'

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" disabled={pending}>
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
            Rate Movie
          </DialogTitle>
          <DialogDescription className="text-center text-muted-foreground">
            Rate this movie
          </DialogDescription>
        </DialogHeader>
        <div>
          <Rating precision={1} totalStars={10} onRatingChange={setRating} />
        </div>
        <form action={handleSubmit}>
          <DialogFooter className="flex w-full flex-row justify-center sm:justify-center">
            <SubmitButton />
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
