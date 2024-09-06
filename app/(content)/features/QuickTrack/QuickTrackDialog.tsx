'use client'
import React from 'react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogDescription,
} from '@/components/ui/dialog'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Checkbox } from '@/components/ui/checkbox'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Progress } from '@/components/ui/progress'
import { Season } from '@/types/tv'
import { WatchedEpisodes } from './QuickTrack'

type QuickTrackDialogProps = {
  seasons: Season[]
  watchedEpisodes: WatchedEpisodes
  toggleEpisode: (seasonId: number, episodeId: number) => void
  toggleSeason: (season: Season) => void
  getSeasonProgress: (
    seasonId: number,
    totalEpisodes: number
  ) => { watchedCount: number; percentage: number }
  Footer: React.ComponentType
}

export default function QuickTrackDialog({
  seasons,
  watchedEpisodes,
  toggleEpisode,
  toggleSeason,
  getSeasonProgress,
  Footer,
}: QuickTrackDialogProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-full justify-center">
          Quick Track
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[80%] overflow-hidden p-0">
        <DialogHeader className="p-6 pb-0">
          <DialogTitle className="text-center text-xl">Quick Track</DialogTitle>
          <DialogDescription className="text-center text-sm">
            Track your progress for each season.
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="h-[calc(80vh-200px)] px-6" type="always">
          <Accordion type="multiple" className="w-full">
            {seasons
              .filter((season) => season.season_number !== 0)
              .map((season) => {
                const { watchedCount, percentage } = getSeasonProgress(
                  season.id,
                  season.episodes.length
                )
                return (
                  <AccordionItem value={season.id.toString()} key={season.id}>
                    <AccordionTrigger className="hover:no-underline">
                      <div className="flex w-full items-center justify-evenly space-x-2">
                        <Checkbox
                          checked={watchedCount === season.episodes.length}
                          onCheckedChange={() => toggleSeason(season)}
                          onClick={(e) => e.stopPropagation()}
                        />
                        <span className="basis-1/6 text-sm">
                          {season.name ?? season.title}
                        </span>
                        <div className="basis-2/6">
                          <Progress value={percentage} className="h-2" />
                        </div>
                        <div className="basis-1/6 text-sm">
                          {watchedCount}/{season.episodes.length} ({percentage}
                          %)
                        </div>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-2 pl-12">
                        {season.episodes.map((episode) => (
                          <div
                            key={episode.episode_id}
                            className="flex items-center gap-x-6 space-x-2 space-y-2 text-base"
                          >
                            <Checkbox
                              checked={
                                watchedEpisodes[season.id.toString()]?.includes(
                                  episode.episode_id
                                ) || false
                              }
                              onCheckedChange={() =>
                                toggleEpisode(season.id, episode.episode_id)
                              }
                            />
                            {episode.episode_number}. {episode.name}
                          </div>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                )
              })}
          </Accordion>
        </ScrollArea>
        <DialogFooter>
          <Footer />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
