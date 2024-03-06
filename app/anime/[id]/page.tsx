import Backdrop from "@/app/movie/components/Backdrop";
import { Skeleton } from "@/components/ui/skeleton";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import React, { Suspense } from "react";
import Poster from "../components/Poster";
import Title from "@/app/movie/components/Title";

export const generateMetadata = ({ params }: Props): Metadata => {
  const title = params.id.split("-").slice(1).join(" ").replace(/%20/g, " ");
  return {
    title: `${title} - Tofutracker`,
  };
};

type Props = {
  params: {
    id: string;
  };
};

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
  return result;
}

export default async function Anime({ params }: { params: { id: string } }) {
  const result = await fetch(
    "http://localhost:8080/api/getanime/" + params.id.split("-")[0]
  ).then((res) => res.json());

  if (result.message === "Anime not found.") {
    return notFound();
  }

  const anime = result[0].anime[0];
  const characters = result[0].characters;
  const creators = result[0].creators;
  const external_links = result[0].external_links[0];
  const similar = result[0].anime_similar;
  const type = anime.type;

  let images;

  type !== "Movie"
    ? (images = await getAnimeImages("tv", anime.id))
    : (images = await getAnimeImages("movie", anime.id));

  const backdrop_path =
    "https://image.tmdb.org/t/p/original" +
    (images.backdrops.reduce((prev: Images, current: Images) =>
      prev.vote_average > current.vote_average ? prev : current
    ).file_path ||
      images.backdrops[0].file_path ||
      "");

  const logo_path =
    "https://image.tmdb.org/t/p/original" +
    (images.logos.reduce((prev: Images, current: Images) =>
      prev.vote_average > current.vote_average ? prev : current
    ).file_path ||
      images.logos[0].file_path ||
      "");

  const poster_path =
    "https://image.tmdb.org/t/p/original" +
    (images.posters.reduce((prev: Images, current: Images) =>
      prev.vote_average > current.vote_average ? prev : current
    ).file_path ||
      images.posters[0].file_path ||
      `https://cdn.anidb.net/images/main/${anime.poster}`);

  return (
    <>
      <title>{`${anime.title} - Tofutracker`}</title>
      <div className="flex flex-col gap-y-6">
        <Suspense fallback={<Skeleton className="h-[288px] w-full" />}>
          <Backdrop
            backdrop_path={backdrop_path}
            title={anime.title}
            logo_path={logo_path}
          />
        </Suspense>
        <div className="flex flex-col sm:flex-row sm:flex basis-1/5 sm:gap-x-8 px-5">
          <div className="flex justify-center">
            <Suspense
              fallback={
                <Skeleton className="w-[124px] sm:w-full h-[186px] sm:h-[full] mt-2" />
              }
            >
              <Poster poster_path={poster_path} title={anime.title} />
            </Suspense>
          </div>
          <div className="flex flex-col basis-4/5">
            <div className="flex justify-center sm:justify-start">
              <Suspense fallback={<Skeleton className="h-6 w-[60vw] mt-6" />}>
                <Title title={anime.title} />
              </Suspense>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
