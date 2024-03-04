import type { Metadata } from "next";
import { Suspense } from "react";
import Title from "../components/Title";
import Backdrop from "../components/Backdrop";
import Poster from "../components/Poster";
import { Skeleton } from "@/components/ui/skeleton";
import Tagline from "../components/Tagline";
import MovieInfo from "../components/MovieInfo";
import MobileButtons from "../components/MobileButtons";
import Details from "../components/Details";
import Overview from "../components/Overview";
import CastAndCrew from "../components/CastAndCrew";
import SimilarMovies from "../components/SimilarMovies";

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

async function getMovieData(id: number) {
  const data = await fetch(
    `https://jellyfish-app-lmbt9.ondigitalocean.app/api/getmovie/${id}`
  );
  const result = await data.json();
  return result;
}

export default async function Movie({ params }: { params: { id: string } }) {
  const movie = await getMovieData(parseInt(params.id.split("-")[0]));
  const {
    title,
    backdrop_path,
    poster_path,
    tagline,
    credits,
    budget,
    revenue,
    overview,
    similar,
  } = movie;
  movie.images.logos.sort(
    (
      a: { vote_average: number; vote_count: number },
      b: { vote_average: number; vote_count: number }
    ) => b.vote_average - a.vote_average || b.vote_count - a.vote_count
  );
  const highestVotedEnLogo = movie.images.logos.find(
    (logo: { iso_639_1: string }) => logo.iso_639_1 === "en"
  );
  const selectedLogo = highestVotedEnLogo || movie.images.logos[0];
  const logo_path = `https://image.tmdb.org/t/p/original${selectedLogo.file_path}`;
  const certification =
    movie.release_dates.results
      .find((result: any) => result.iso_3166_1 === "US")
      .release_dates.map((release: any) => {
        if (release.certification) {
          return release.certification;
        }
        return "";
      })[0] || "";

  const crew = credits.crew;
  const similarMovies = similar.results;

  return (
    <div className="w-full h-full">
      <div className="flex flex-col gap-y-6">
        <Suspense fallback={<Skeleton className="h-[288px] w-full" />}>
          <Backdrop
            backdrop_path={backdrop_path}
            title={title}
            logo_path={logo_path}
          />
        </Suspense>
        <div className="flex flex-col sm:flex-row sm:flex basis-1/5 sm:gap-x-8 px-5">
          <div className="flex justify-center">
            <Suspense
              fallback={
                <Skeleton className="w-[124px] sm:w-full h-[186px] mt-2" />
              }
            >
              <Poster poster_path={poster_path} title={title} />
            </Suspense>
          </div>
          <div className="flex flex-col basis-4/5">
            <div className="flex justify-center sm:justify-start">
              <Suspense fallback={<Skeleton className="h-6 w-[60vw] mt-6" />}>
                <Title title={title} />
              </Suspense>
            </div>
            <div className="flex justify-center sm:justify-start">
              <Suspense
                fallback={<Skeleton className="w-[80%] h-[24px] mt-6" />}
              >
                <Tagline tagline={tagline} />
              </Suspense>
            </div>
            <div className="flex justify-center ">
              <Suspense
                fallback={<Skeleton className="w-full h-[94px] mt-6" />}
              >
                <MovieInfo
                  vote_average={movie.vote_average}
                  release_date={movie.release_date}
                  runtime={movie.runtime}
                  language={movie.original_language}
                  certification={certification}
                />
              </Suspense>
            </div>
            <div className="sm:hidden flex justify-center mt-6">
              <Suspense
                fallback={<Skeleton className="w-full h-[168px] mt-6" />}
              >
                <MobileButtons />
              </Suspense>
            </div>
            <div className="mt-6">
              <div className="contentpagedetailtitle">Details</div>
              <Suspense
                fallback={<Skeleton className="w-full h-[253px] mt-6" />}
              >
                <Details crew={crew} budget={budget} revenue={revenue} />
              </Suspense>
            </div>
            <div className="mt-6">
              <div className="contentpagedetailtitle">Overview</div>

              <Suspense
                fallback={<Skeleton className="w-full h-[300px] mt-6" />}
              >
                <Overview overview={overview} />
              </Suspense>
            </div>
            <div className="mt-6">
              <Suspense
                fallback={<Skeleton className="w-full h-[300px] mt-6" />}
              >
                <CastAndCrew credits={credits} />
              </Suspense>
            </div>
            <div className="mt-6">
              <div className="contentpagedetailtitle">Similar Movies</div>
              <Suspense
                fallback={<Skeleton className="w-full h-[300px] mt-6" />}
              >
                <SimilarMovies similar={similarMovies} />
              </Suspense>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
