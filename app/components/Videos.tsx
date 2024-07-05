'use client'

import React, { useState, useEffect } from 'react'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from '@/components/ui/carousel'

export default function Videos({ videos }: { videos: Video[] }) {
  const [sortedVideos, setSortedVideos] = useState<Video[]>([])
  const [activeVideo, setActiveVideo] = useState<Video | null>(null)

  useEffect(() => {
    // Sort videos to have trailers first
    const sorted = [...videos].sort((a, b) => {
      if (a.type.toLowerCase() === 'trailer') return -1
      if (b.type.toLowerCase() === 'trailer') return 1
      return 0
    })
    setSortedVideos(sorted)
    // Set the first video as active by default
    if (sorted.length > 0 && !activeVideo) {
      setActiveVideo(sorted[0])
    }
  }, [videos])

  const handleVideoClick = (video: Video) => {
    setActiveVideo(video)
  }

  return (
    <section className="mt-6">
      {activeVideo && (
        <div className="mb-6">
          <div className="aspect-video">
            <iframe
              src={`https://www.youtube.com/embed/${activeVideo.key}`}
              title={activeVideo.name}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="h-full w-full"
            />
          </div>
          <div className="bg-background p-4">
            <h3 className="text-lg font-semibold">{activeVideo.name}</h3>
            <p className="text-sm text-muted-foreground">{activeVideo.type}</p>
          </div>
        </div>
      )}
      <Carousel
        className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl"
        opts={{
          align: 'start',
          dragFree: true,
          slidesToScroll: 1,
        }}
      >
        <CarouselContent>
          {sortedVideos.map((video) => (
            <CarouselItem
              key={video.id}
              className="pl-1 md:basis-1/2 lg:basis-1/3"
            >
              <div
                className="cursor-pointer overflow-hidden rounded-lg"
                onClick={() => handleVideoClick(video)}
              >
                <div className="aspect-video">
                  <img
                    src={`https://img.youtube.com/vi/${video.key}/0.jpg`}
                    alt={video.name}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="bg-background p-4">
                  <h3 className="truncate text-lg font-semibold">
                    {video.name}
                  </h3>
                  <p className="text-sm text-muted-foreground">{video.type}</p>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="absolute -top-9 right-16">
          <CarouselPrevious className="ml-5 rounded-md border-muted-foreground" />
          <CarouselNext className="rounded-md border-muted-foreground" />
        </div>
      </Carousel>
    </section>
  )
}
