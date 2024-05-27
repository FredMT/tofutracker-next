import { Skeleton } from "@/components/ui/skeleton";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import React, { Suspense } from "react";
import Title from "@/app/movie/components/Title";
import AnimeInfo from "../components/AnimeInfo";
import MobileButtons from "@/app/movie/components/MobileButtons";
import AnimeDetails from "../components/AnimeDetails";
import AnimeBackdrop from "../components/AnimeBackdrop";
import AnimePoster from "../components/AnimePoster";
import Overview from "@/app/movie/components/Overview";
import AnimeSeasonsAndEpisodes from "../components/AnimeSeasonsAndEpisodes";
import SimilarAnime from "../components/SimilarAnime";
import RelatedAnime from "../components/RelatedAnime";

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

export default async function Anime({ params }: { params: { id: string } }) {
  const result = await fetch(
    "https://tofutracker-3pt5y.ondigitalocean.app/api/getanime/" +
      params.id.split("-")[0]
  )
    .then((res) => res.json())
    .catch((err) => console.log(err));

  if (result.message === "Anime not found.") {
    return notFound();
  }

  const anime = result[0].anime[0];

  return (
    <div className="flex flex-col gap-y-6">
      <Suspense fallback={<Skeleton className="h-[288px] w-full" />}>
        <AnimeBackdrop title={anime.title} type={anime.type} id={anime.id} />
      </Suspense>
      <div className="flex flex-col sm:flex-row sm:flex basis-1/5 sm:gap-x-8 px-5">
        <div className="flex justify-center">
          <Suspense
            fallback={
              <Skeleton className="w-[124px] sm:w-[175px] h-[186px] sm:h-[full] mt-2" />
            }
          >
            <AnimePoster
              title={anime.title}
              type={anime.type}
              id={anime.id}
              poster={anime.poster}
            />
          </Suspense>
        </div>
        <div className="flex flex-col basis-4/5">
          <div className="flex justify-center sm:justify-start">
            <Suspense fallback={<Skeleton className="h-6 w-[60vw] mt-6" />}>
              <Title title={anime.title} />
            </Suspense>
          </div>
          <div className="flex justify-center ">
            <Suspense fallback={<Skeleton className="w-full h-[94px] mt-6" />}>
              <AnimeInfo
                externalLinks={result[0]?.external_links[0]}
                anime={anime}
                creators={result[0]?.creators}
              />
            </Suspense>
          </div>
          <div className="sm:hidden flex justify-center mt-6">
            <Suspense fallback={<Skeleton className="w-full h-[168px] mt-6" />}>
              <MobileButtons />
            </Suspense>
          </div>
          <div className="mt-6">
            <div className="contentpagedetailtitle">Details</div>
            <Suspense fallback={<Skeleton className="w-full h-[253px] mt-6" />}>
              <AnimeDetails anime={anime} creators={result[0]?.creators} />
            </Suspense>
          </div>
          <div className="mt-6">
            <div className="contentpagedetailtitle">Overview</div>

            <Suspense fallback={<Skeleton className="w-full h-[300px] mt-6" />}>
              <Overview overview={anime.description} />
            </Suspense>
          </div>
          <div className="mt-6">
            <AnimeSeasonsAndEpisodes
              start_date={anime.start_date}
              end_date={anime.end_date}
            />
          </div>
          <div>
            <Suspense fallback={<Skeleton className="w-full h-[300px] mt-6" />}>
              <RelatedAnime id={anime.id} />
            </Suspense>
          </div>
          <div className="mt-6 pb-6 sm:pb-20">
            <div className="contentpagedetailtitle">Similar Anime</div>
            <Suspense fallback={<Skeleton className="w-full h-[300px] mt-6" />}>
              <SimilarAnime type={anime.type} id={anime.id} />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  );
}
