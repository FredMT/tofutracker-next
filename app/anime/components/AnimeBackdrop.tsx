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
  const url = `http://localhost:8080/api/getanimeimages/${type}/${id}`;
  const data = await fetch(url);
  const result = await data.json();
  return result.data;
}

export default async function AnimeBackdrop({
  title,
  type,
  id,
}: {
  title: string;
  type: string;
  id: number;
}) {
  let images;

  type !== "Movie"
    ? (images = await getAnimeImages("tv", id))
    : (images = await getAnimeImages("movie", id));

  const backdrop_path =
    images?.backdrops && images.backdrops.length > 0
      ? "https://image.tmdb.org/t/p/original" +
        images.backdrops.reduce((prev: Images, current: Images) =>
          prev.vote_average > current.vote_average ? prev : current
        ).file_path
      : undefined;

  const logo_path =
    "https://image.tmdb.org/t/p/original" + images?.logos &&
    images?.logos?.length > 0
      ? images.logos.reduce((prev: Images, current: Images) =>
          prev.vote_average > current.vote_average ? prev : current
        ).file_path
      : undefined;

  return (
    <div className="relative">
      <Image
        className="w-full h-[288px] sm:w-full sm:h-[576px] object-cover"
        src={
          backdrop_path
            ? `https://image.tmdb.org/t/p/original${backdrop_path}`
            : "https://placehold.co/1920x1080/000000/FFFFFF.png?text=Banner+Image+Not+Found"
        }
        alt={title}
        width={1920}
        height={1080}
        priority
      />
      {logo_path && (
        <Image
          src={`https://image.tmdb.org/t/p/original${logo_path}`}
          alt={title}
          width={1920}
          height={1080}
          className="absolute -bottom-[45%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[200px] sm:w-[400px] h-[200px] sm:h-[400px] object-contain"
        />
      )}
    </div>
  );
}
