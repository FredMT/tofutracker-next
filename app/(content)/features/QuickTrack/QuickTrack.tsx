'use client'

import { useMediaQuery } from 'usehooks-ts'
import QuickTrackDialog from './QuickTrackDialog'
import QuickTrackDrawer from './QuickTrackDrawer'
import { Season } from '@/types/tv'
import { useMemo, useState, useCallback, useEffect } from 'react'
import { Separator } from '@/components/ui/separator'
import { Button } from '@/components/ui/button'
import { useToast } from '@/components/ui/use-toast'
import { quickTrackAction } from '@/app/(content)/features/QuickTrack/actions'
import { useServerAction } from 'zsa-react'

export type WatchedEpisodes = { [seasonId: string]: number[] }

export function QuickTrack({
  seasons,
  watchedEpisodeIds,
  showId,
  type,
  isAnime = false,
}: {
  seasons: Season[]
  watchedEpisodeIds: number[]
  showId: string
  type?: string
  isAnime?: boolean
}) {
  const isDesktop = useMediaQuery('(min-width: 640px)')
  const { toast } = useToast()
  const [watchedEpisodes, setWatchedEpisodes] = useState<WatchedEpisodes>({})
  const [originalWatchedEpisodes, setOriginalWatchedEpisodes] =
    useState<WatchedEpisodes>({})
  const { execute, isPending } = useServerAction(quickTrackAction)

  useEffect(() => {
    const initialWatchedEpisodes = seasons.reduce((acc, season) => {
      const seasonId = season.id.toString()
      acc[seasonId] = season.episodes
        .filter((episode) => watchedEpisodeIds.includes(episode.episode_id))
        .map((episode) => episode.episode_id)
      return acc
    }, {} as WatchedEpisodes)

    setWatchedEpisodes(initialWatchedEpisodes)
    setOriginalWatchedEpisodes(initialWatchedEpisodes)
  }, [seasons, watchedEpisodeIds])

  const hasChanges = useMemo(() => {
    const originalKeys = Object.keys(originalWatchedEpisodes)
    const currentKeys = Object.keys(watchedEpisodes)

    if (originalKeys.length !== currentKeys.length) return true

    for (const key of currentKeys) {
      if (
        watchedEpisodes[key]?.length !== originalWatchedEpisodes[key]?.length
      ) {
        return true
      }
      if (
        !watchedEpisodes[key]?.every((ep) =>
          originalWatchedEpisodes[key]?.includes(ep)
        )
      ) {
        return true
      }
    }

    return false
  }, [watchedEpisodes, originalWatchedEpisodes])

  const handleCancel = () => {
    setWatchedEpisodes(originalWatchedEpisodes)
  }

  const handleSubmit = async () => {
    const updates = Object.entries(seasons).reduce(
      (acc, [_, season]) => {
        const seasonId = season.id.toString()
        const currentArray = watchedEpisodes[seasonId] || []
        const originalArray = originalWatchedEpisodes[seasonId] || []

        const add = currentArray.filter((ep) => !originalArray.includes(ep))
        const remove = originalArray.filter((ep) => !currentArray.includes(ep))

        if (add.length > 0 || remove.length > 0) {
          acc[seasonId] = { add, remove }
        }

        return acc
      },
      {} as { [seasonId: string]: { add: number[]; remove: number[] } }
    )

    const updatesPayload = {
      [type === 'animetv' ? `${showId}2` : showId]: updates,
    }

    try {
      const [data, err] = await execute({
        updates: updatesPayload,
        mediaType: isAnime ? 'animetv' : 'tv',
      })

      if (err) {
        toast({
          title: 'Error',
          description: err.message,
          variant: 'destructive',
        })
      }

      if (data) {
        toast({
          title: 'Success',
          description: 'Show progress updated successfully',
          variant: 'success',
        })
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'An unexpected error occurred',
        variant: 'destructive',
      })
    }
  }

  const toggleEpisode = useCallback((seasonId: number, episodeId: number) => {
    setWatchedEpisodes((prev) => {
      const newWatched = { ...prev }
      const seasonKey = seasonId.toString()
      if (!newWatched[seasonKey]) {
        newWatched[seasonKey] = []
      }

      const index = newWatched[seasonKey].indexOf(episodeId)
      if (index > -1) {
        newWatched[seasonKey] = newWatched[seasonKey].filter(
          (id) => id !== episodeId
        )
      } else {
        newWatched[seasonKey] = [...newWatched[seasonKey], episodeId]
      }

      if (newWatched[seasonKey].length === 0) {
        delete newWatched[seasonKey]
      }

      return newWatched
    })
  }, [])

  const toggleSeason = useCallback((season: Season) => {
    setWatchedEpisodes((prev) => {
      const newWatched = { ...prev }
      const seasonKey = season.id.toString()
      const allEpisodeIds = season.episodes.map((ep) => ep.episode_id)

      if (newWatched[seasonKey]?.length === season.episodes.length) {
        delete newWatched[seasonKey]
      } else {
        newWatched[seasonKey] = allEpisodeIds
      }

      return newWatched
    })
  }, [])

  const getSeasonProgress = useCallback(
    (seasonId: number, totalEpisodes: number) => {
      const seasonKey = seasonId.toString()
      const watchedCount = watchedEpisodes[seasonKey]?.length || 0
      const percentage = (watchedCount / totalEpisodes) * 100
      return {
        watchedCount,
        percentage: Math.round(percentage),
      }
    },
    [watchedEpisodes]
  )

  const Footer = () => (
    <div className="w-full">
      <Separator />
      <div className="flex w-full justify-end space-x-2 p-4">
        <Button
          variant="outline"
          onClick={handleCancel}
          disabled={!hasChanges || isPending}
        >
          Cancel
        </Button>
        <Button onClick={handleSubmit} disabled={!hasChanges || isPending}>
          {isPending ? 'Submitting...' : 'Submit'}
        </Button>
      </div>
    </div>
  )

  const sharedProps = {
    seasons,
    watchedEpisodes,
    toggleEpisode,
    toggleSeason,
    getSeasonProgress,
    Footer,
  }

  if (isDesktop) {
    return <QuickTrackDialog {...sharedProps} />
  }

  return <QuickTrackDrawer {...sharedProps} />
}
