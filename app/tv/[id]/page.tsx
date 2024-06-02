import React, { Suspense } from "react";
import type { Metadata } from "next";
import Title from "@/app/movie/components/Title";
import { Skeleton } from "@/components/ui/skeleton";
import Backdrop from "@/app/movie/components/Backdrop";
import Poster from "@/app/movie/components/Poster";
import Tagline from "@/app/movie/components/Tagline";
import MovieInfo from "@/app/movie/components/MovieInfo";
import MobileButtons from "@/app/movie/components/MobileButtons";
import Details from "../components/Details";
import Overview from "@/app/movie/components/Overview";
import SeasonsAndEpisodes from "../components/SeasonsAndEpisodes";
import CastAndCrew from "../components/CastAndCrew";
import SimilarTVShows from "../components/SimilarTVShows";

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

async function getTVData(id: number) {
  const data = await fetch(
    `https://tofutracker-3pt5y.ondigitalocean.app/api/gettv/${id}`
  );
  const result = await data.json();
  return result;
}

export default async function TVShow({ params }: { params: { id: string } }) {
  const tv = await getTVData(parseInt(params.id.split("-")[0]));

  let logo_path = "";

  if (tv.images.logos) {
    const highestVotedEnLogo = tv.images.logos.find(
      (logo: { iso_639_1: string }) => logo.iso_639_1 === "en"
    );

    if (highestVotedEnLogo) {
      logo_path = `https://image.tmdb.org/t/p/original${highestVotedEnLogo.file_path}`;
    }

    logo_path = `https://image.tmdb.org/t/p/original${logo_path}`;
  }

  return (
    <div className="flex flex-col gap-y-6">
      <Suspense fallback={<Skeleton className="h-[288px] w-full" />}>
        <Backdrop
          backdrop_path={tv.backdrop_path}
          title={tv.name}
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
            <Poster poster_path={tv.poster_path} title={tv.name} />
          </Suspense>
        </div>
        <div className="flex flex-col basis-4/5">
          <div className="flex justify-center sm:justify-start">
            <Suspense fallback={<Skeleton className="h-6 w-[60vw] mt-6" />}>
              <Title title={tv.name} />
            </Suspense>
          </div>
          <div className="flex justify-center sm:justify-start">
            <Suspense fallback={<Skeleton className="w-[80%] h-[24px] mt-6" />}>
              <Tagline tagline={tv.tagline} />
            </Suspense>
          </div>
          <div className="flex justify-center ">
            <Suspense fallback={<Skeleton className="w-full h-[94px] mt-6" />}>
              <MovieInfo
                vote_average={tv.vote_average}
                release_date={tv.first_air_date.split("-")[0]}
                runtime={tv.episode_run_time[0]}
                language={tv.original_language}
                certification={tv.content_ratings}
              />
            </Suspense>
          </div>
          <div className="sm:hidden flex justify-center mt-6">
            <Suspense fallback={<Skeleton className="w-full h-[168px] mt-6" />}>
              <MobileButtons item_id={tv.id} item_type="TV" />
            </Suspense>
          </div>
          <div className="mt-6">
            <div className="contentpagedetailtitle">Details</div>
            <Suspense fallback={<Skeleton className="w-full h-[253px] mt-6" />}>
              <Details
                type={tv.type}
                status={tv.status}
                creators={tv.created_by}
                production_companies={tv.networks}
                seasons={tv.number_of_seasons}
                episodes={tv.number_of_episodes}
              />
            </Suspense>
          </div>
          <div className="mt-6">
            <div className="contentpagedetailtitle">Overview</div>

            <Suspense fallback={<Skeleton className="w-full h-[300px] mt-6" />}>
              <Overview overview={tv.overview} />
            </Suspense>
          </div>
          <div className="mt-6">
            <SeasonsAndEpisodes />
          </div>
          <div className="mt-6">
            <Suspense fallback={<Skeleton className="w-full h-[300px] mt-6" />}>
              <CastAndCrew credits={tv.aggregate_credits} />
            </Suspense>
          </div>
          <div className="mt-6 pb-6 sm:pb-20">
            <div className="contentpagedetailtitle">Similar TV Shows</div>
            <Suspense fallback={<Skeleton className="w-full h-[300px] mt-6" />}>
              <SimilarTVShows similar={tv.recommendations.results} />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  );
}
