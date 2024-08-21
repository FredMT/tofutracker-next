'use client'

import * as React from 'react'
import { Progress } from '@/components/ui/progress'

export function EpisodeProgress({
  watched_episodes,
  aired_episodes,
}: {
  watched_episodes: number
  aired_episodes: number
}) {
  const [progress, setProgress] = React.useState(0)

  React.useEffect(() => {
    const calculateProgress = () => {
      if (aired_episodes === 0) return 0
      return Math.round((watched_episodes / aired_episodes) * 100)
    }

    const timer = setTimeout(() => setProgress(calculateProgress()), 350)
    return () => clearTimeout(timer)
  }, [watched_episodes, aired_episodes])

  return (
    <div className="w-full">
      <Progress
        value={progress}
        className="h-2 w-full rounded-bl-sm rounded-br-sm rounded-tl-none rounded-tr-none"
      />
      <p className="text-center text-sm text-muted-foreground">
        {watched_episodes} / {aired_episodes} episodes watched
      </p>
    </div>
  )
}
