'use client'
import React, { useState, useCallback, useRef, useEffect } from 'react'
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from '@/components/ui/popover'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { ChevronRight } from 'lucide-react'
import { Checkbox } from '@/components/ui/checkbox'
import { Separator } from '@/components/ui/separator'

// Types
type Episode = {
  id: string
  name: string
}

type Season = {
  id: string
  name: string
  episodes: Episode[]
}

// Mock data with 10 seasons and 20 episodes each
const seasons: Season[] = Array.from({ length: 10 }, (_, i) => ({
  id: `season-${i + 1}`,
  name: `Season ${i + 1}`,
  episodes: Array.from({ length: 20 }, (_, j) => ({
    id: `season-${i + 1}-episode-${j + 1}`,
    name: `Episode ${j + 1}`,
  })),
}))

const SeasonEpisodeSelector: React.FC = () => {
  const [selectedEpisodes, setSelectedEpisodes] = useState<Set<string>>(
    new Set()
  )
  const [originalSelectedEpisodes, setOriginalSelectedEpisodes] = useState<
    Set<string>
  >(new Set())
  const [openSeasonId, setOpenSeasonId] = useState<string | null>(null)
  const [isSeasonsPopoverOpen, setIsSeasonsPopoverOpen] = useState(false)
  const [hasChanges, setHasChanges] = useState(false)
  const seasonsPopoverRef = useRef<HTMLDivElement>(null)
  const episodesPopoverRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setHasChanges(!areSetsEqual(selectedEpisodes, originalSelectedEpisodes))
  }, [selectedEpisodes, originalSelectedEpisodes])

  useEffect(() => {
    if (!isSeasonsPopoverOpen) {
      setOpenSeasonId(null)
    }
  }, [isSeasonsPopoverOpen])

  const areSetsEqual = (a: Set<string>, b: Set<string>) => {
    if (a.size !== b.size) return false
    return Array.from(a).every((value) => b.has(value))
  }

  const isSeasonSelected = useCallback(
    (seasonId: string) => {
      const season = seasons.find((s) => s.id === seasonId)
      return (
        season?.episodes.some((episode) => selectedEpisodes.has(episode.id)) ??
        false
      )
    },
    [selectedEpisodes]
  )

  const handleSeasonSelect = useCallback(
    (seasonId: string) => {
      const newSelectedEpisodes = new Set(selectedEpisodes)
      const season = seasons.find((s) => s.id === seasonId)

      if (season) {
        if (isSeasonSelected(seasonId)) {
          season.episodes.forEach((episode) =>
            newSelectedEpisodes.delete(episode.id)
          )
        } else {
          season.episodes.forEach((episode) =>
            newSelectedEpisodes.add(episode.id)
          )
        }
      }

      setSelectedEpisodes(newSelectedEpisodes)
    },
    [selectedEpisodes, isSeasonSelected]
  )

  const handleEpisodeSelect = useCallback(
    (episodeId: string) => {
      const newSelectedEpisodes = new Set(selectedEpisodes)

      if (newSelectedEpisodes.has(episodeId)) {
        newSelectedEpisodes.delete(episodeId)
      } else {
        newSelectedEpisodes.add(episodeId)
      }

      setSelectedEpisodes(newSelectedEpisodes)
    },
    [selectedEpisodes]
  )

  const handleSeasonClick = (seasonId: string) => {
    setOpenSeasonId(openSeasonId === seasonId ? null : seasonId)
  }

  const handleSubmit = () => {
    const added = Array.from(selectedEpisodes).filter(
      (id) => !originalSelectedEpisodes.has(id)
    )
    const removed = Array.from(originalSelectedEpisodes).filter(
      (id) => !selectedEpisodes.has(id)
    )
    console.log('Changes submitted:', { added, removed })
    setOriginalSelectedEpisodes(new Set(selectedEpisodes))
    setHasChanges(false)
    setIsSeasonsPopoverOpen(false) // Close the main popover
    setOpenSeasonId(null) // Close any open episode popover
  }

  const handleCancel = () => {
    setSelectedEpisodes(new Set(originalSelectedEpisodes))
    setHasChanges(false)
  }

  return (
    <Popover
      open={isSeasonsPopoverOpen}
      onOpenChange={setIsSeasonsPopoverOpen}
      modal={true}
    >
      <PopoverTrigger asChild>
        <Button variant="outline">Quick Track</Button>
      </PopoverTrigger>
      <PopoverContent className="w-56" ref={seasonsPopoverRef} side="bottom">
        <ScrollArea className="h-[150px]">
          {seasons.map((season) => (
            <div key={season.id} className="">
              <div className="flex items-center">
                <Checkbox
                  checked={isSeasonSelected(season.id)}
                  onCheckedChange={() => handleSeasonSelect(season.id)}
                />
                <Popover
                  open={openSeasonId === season.id}
                  onOpenChange={(open) => {
                    if (!open) setOpenSeasonId(null)
                  }}
                >
                  <PopoverTrigger asChild>
                    <Button
                      variant="ghost"
                      className={`w-[85%] justify-start ${isSeasonSelected(season.id) ? 'bg-accent' : ''}`}
                      onClick={() => handleSeasonClick(season.id)}
                    >
                      <div className="flex w-full items-center justify-between">
                        <div>{season.name}</div>
                        <div>
                          <ChevronRight className="size-4" />
                        </div>
                      </div>
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent
                    side="right"
                    align="start"
                    className="w-56"
                    ref={episodesPopoverRef}
                  >
                    <ScrollArea className="h-[300px]">
                      {season.episodes.map((episode) => (
                        <div key={episode.id} className="flex items-center">
                          <Checkbox
                            checked={selectedEpisodes.has(episode.id)}
                            onCheckedChange={() =>
                              handleEpisodeSelect(episode.id)
                            }
                            className="mr-2"
                          />
                          <Button
                            variant="ghost"
                            className={`w-[75%] justify-start ${
                              selectedEpisodes.has(episode.id)
                                ? 'bg-accent'
                                : ''
                            }`}
                            onClick={() => handleEpisodeSelect(episode.id)}
                          >
                            {episode.name}
                          </Button>
                        </div>
                      ))}
                    </ScrollArea>
                  </PopoverContent>
                </Popover>
              </div>
            </div>
          ))}
        </ScrollArea>
        {hasChanges && isSeasonsPopoverOpen && (
          <div className="rounded-md bg-popover">
            <Separator className="my-2" />
            <div className="flex justify-around space-x-2">
              <Button variant="outline" onClick={handleCancel}>
                Cancel
              </Button>
              <Button onClick={handleSubmit}>Submit</Button>
            </div>
          </div>
        )}
      </PopoverContent>
    </Popover>
  )
}

export default SeasonEpisodeSelector
