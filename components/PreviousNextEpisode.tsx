'use client'
import {
  formatDuration,
  intervalToDuration,
  intlFormatDistance,
} from 'date-fns'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Timer } from 'lucide-react'
import { useEffect, useState } from 'react'

type Props = {
  season_number?: number
  episode_number?: number
  title?: string
  overview?: string
  first_aired: number
  isNext?: boolean
  episode_type?: string
}

export default function PreviousNextEpisode({
  season_number,
  episode_number,
  title,
  overview,
  first_aired,
  isNext,
  episode_type = '',
}: Props) {
  const [duration, setDuration] = useState(
    intervalToDuration({
      start: new Date(),
      end: new Date(first_aired * 1000),
    })
  )

  useEffect(() => {
    const timer = setInterval(() => {
      setDuration(
        intervalToDuration({
          start: new Date(),
          end: new Date(first_aired * 1000),
        })
      )
    }, 1000) // Update duration every second

    return () => clearInterval(timer) // Cleanup on component unmount
  }, [first_aired])

  const [expanded, setExpanded] = useState(false)

  const toggleExpanded = () => {
    setExpanded(!expanded)
  }

  const getWordsToShow = () => {
    if (typeof window !== 'undefined') {
      const width = window.innerWidth
      switch (true) {
        case width >= 1280:
          return 25
        case width >= 1024:
          return 20
        case width >= 768:
          return 15
        case width >= 640:
          return 10
        default:
          return 5
      }
    }
    return 5
  }

  const truncateOverview = (text: string, wordsToShow: number) => {
    const words = text.split(' ')
    if (words.length <= wordsToShow) {
      return text
    }
    return words.slice(0, wordsToShow).join(' ') + '...'
  }

  return (
    <Card className="w-full basis-1/2">
      <CardHeader>
        <div className="flex items-center gap-2">
          <div className="rounded-md bg-primary px-2 py-1 text-xs font-medium text-primary-foreground">
            Season {season_number}
          </div>
          <div className="rounded-md bg-muted px-2 py-1 text-xs font-medium text-muted-foreground">
            Episode {episode_number}
          </div>
          {episode_type === 'season_finale' && (
            <div className="text-red-500-foreground rounded-md bg-red-500 px-2 py-1 text-xs font-medium">
              Season Finale
            </div>
          )}
        </div>
        <CardTitle>
          <p className="mt-2">
            {`${episode_type === 'season_finale' ? 'Final' : isNext ? 'Next' : 'Previous'} episode: ${title}`}
          </p>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {overview && (
          <p className="text-sm text-muted-foreground">
            {expanded ? (
              overview
            ) : (
              <>
                {truncateOverview(overview || '', getWordsToShow())}{' '}
                <button
                  className="text-primary hover:underline"
                  onClick={toggleExpanded}
                >
                  Show more
                </button>
              </>
            )}
          </p>
        )}
        {expanded && (
          <button
            className="mt-2 text-sm text-primary hover:underline"
            onClick={toggleExpanded}
          >
            Show less
          </button>
        )}
        <div className="mt-4 flex items-center gap-2">
          {isNext && (
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Timer />
              {`Next episode airs in ${duration.days ? duration.days + 'd' : ''} ${duration.hours ? duration.hours + 'h' : ''} ${duration.minutes ? duration.minutes + 'm' : ''} ${duration.seconds ? duration.seconds + 's' : ''}`}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
