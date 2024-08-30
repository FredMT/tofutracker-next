'use client'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer'
import { Progress } from '@/components/ui/progress'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Season } from '@/types/tv'
import { ChevronRight } from 'lucide-react'
import React from 'react'
import { WatchedEpisodes } from './QuickTrack'

type QuickTrackDrawerProps = {
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

export default function QuickTrackDrawer({
  seasons,
  watchedEpisodes,
  toggleEpisode,
  toggleSeason,
  getSeasonProgress,
  Footer,
}: QuickTrackDrawerProps) {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="outline" className="w-full justify-center">
          Quick Track
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Quick Track</DrawerTitle>
          <DrawerDescription className="text-center text-sm">
            Track your progress for each season
          </DrawerDescription>
        </DrawerHeader>
        <div className="mt-4 border-t p-4">
          {seasons
            .filter((season) => season.season_number !== 0)
            .map((season) => {
              const { watchedCount, percentage } = getSeasonProgress(
                season.id,
                season.episodes.length
              )
              return (
                <Drawer key={season.id}>
                  <DrawerTrigger asChild>
                    <div className="mb-4 flex cursor-pointer items-center space-x-2">
                      <Checkbox
                        checked={watchedCount === season.episodes.length}
                        onCheckedChange={() => toggleSeason(season)}
                        onClick={(e) => e.stopPropagation()}
                      />
                      <div className="flex flex-grow items-center space-x-6">
                        <div className="ml-4 w-[70px] text-sm font-medium">
                          {season.name ?? season.title}
                        </div>
                        <div className="basis-2/5">
                          <Progress value={percentage} className="h-2" />
                        </div>
                        <div className="text-xs">
                          {watchedCount}/{season.episodes.length} ({percentage}
                          %)
                        </div>
                      </div>
                      <ChevronRight size={20} />
                    </div>
                  </DrawerTrigger>
                  <DrawerContent className="max-h-[485px]">
                    <DrawerHeader>
                      <DrawerTitle>{season.name ?? season.title}</DrawerTitle>
                      <DrawerDescription className="text-center text-sm">
                        Track your progress for {season.name ?? season.title}
                      </DrawerDescription>
                    </DrawerHeader>
                    <ScrollArea className="h-[500px]">
                      <div className="mt-4 border-t p-4">
                        {season.episodes.map((episode) => (
                          <div
                            key={episode.episode_id}
                            className="mb-2 flex items-center space-x-6 px-2 py-1"
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
                            <span>
                              {episode.episode_number}. {episode.name}
                            </span>
                          </div>
                        ))}
                      </div>
                    </ScrollArea>
                  </DrawerContent>
                </Drawer>
              )
            })}
        </div>
        <DrawerFooter>
          <Footer />
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
