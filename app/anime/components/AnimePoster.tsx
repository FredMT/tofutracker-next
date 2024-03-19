import { Button } from "@/components/ui/button";
import Image from "next/image";
import React from "react";

type Images = {
  aspect_ratio: number;
  file_path: string;
  height: number;
  iso_639_1: string;
  vote_average: number;
  vote_count: number;
  width: number;
};

async function getAnimeImages(type: string, id: number) {
  const url = `https://jellyfish-app-lmbt9.ondigitalocean.app/api/getanimeimages/${type}/${id}`;
  const data = await fetch(url);
  const result = await data.json();
  return result.data;
}

export default async function AnimePoster({
  title,
  type,
  poster,
  id,
}: {
  title: string;
  type: string;
  poster: string;
  id: number;
}) {
  let images;
  let poster_path;

  type !== "Movie"
    ? (images = await getAnimeImages("tv", id))
    : (images = await getAnimeImages("movie", id));

  if (images?.posters && images.posters.length > 0) {
    const highestRatedPoster = images.posters.reduce(
      (prev: Images, current: Images) =>
        prev.vote_average > current.vote_average ? prev : current
    );
    poster_path =
      "https://image.tmdb.org/t/p/w440_and_h660_face" +
      highestRatedPoster.file_path;
  } else {
    poster_path = `https://cdn.anidb.net/images/main/${poster}`;
  }

  return (
    <div className="flex flex-col gap-y-6">
      <Image
        className="w-[124px] h-[186px] sm:min-w-[182px] sm:h-[273px] md:min-w-[224px] md:h-[336px] object-cover rounded-sm border border-muted"
        src={poster_path}
        alt={title}
        width={600}
        height={900}
        priority
      />
      <div className="sm:flex sm:flex-col gap-y-4 hidden">
        <Button className="w-full">Add to Library</Button>
        <Button className="w-full">Add to Watchlist</Button>
        <Button className="w-full">Add to Custom List</Button>
        <Button className="w-full">Rate</Button>
        <Button className="w-full">Watch</Button>
      </div>
    </div>
  );
}
