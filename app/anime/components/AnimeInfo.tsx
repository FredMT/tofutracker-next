import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

type AnimeInfoProps = {
  anime: Anime;
  externalLinks: ExternalLinksProps;
  creators: AnimeCreator[];
};

type Anime = {
  id: number;
  url: string;
  type: string;
  title: string;
  poster: string;
  rating: number;
  end_date: string;
  identifier: string;
  start_date: string;
  description: string;
  korean_title: string;
  chinese_title: string;
  english_title: string;
  episode_count: number;
  japanese_title: string;
};

type ExternalLinksProps = {
  ann: string | null;
  imdb: string | null;
  tmdb: string | null;
  baidu: string | null;
  douban: string | null;
  hidive: string | null;
  netflix: string | null;
  twitter: string | null;
  youtube: string | null;
  amazon_dp: string | null;
  funimation: string | null;
  primevideo: string | null;
  crunchyroll: string | null;
  myanimelist: string | null;
  wikipedia_en: string | null;
  wikipedia_ja: string | null;
  tencent_video: string | null;
};

type AnimeCreator = {
  id: number;
  name: string;
  type: string;
  anime_id: number;
};

async function getSeasonYear(startDate: string) {
  const [year, month] = startDate.split("-").map(Number);
  const seasons = ["Winter", "Spring", "Summer", "Fall"];
  const seasonIndex = Math.floor((month - 1) / 3);
  return `${seasons[seasonIndex]} ${year}`;
}

export default async function AnimeInfo({
  anime,
  externalLinks,
  creators,
}: AnimeInfoProps) {
  const seasonYear = await getSeasonYear(anime.start_date);

  const linkTemplates = {
    twitter: "https://twitter.com/",
    ann: "https://www.animenewsnetwork.com/encyclopedia/anime.php?id=",
    youtube: "https://www.youtube.com/",
    funimation: "https://www.funimation.com/shows/",
    crunchyroll: "https://www.crunchyroll.com/series/",
    myanimelist: "https://myanimelist.net/anime/",
    wikipedia_en: "https://en.wikipedia.org/wiki/",
    wikipedia_ja: "https://ja.wikipedia.org/wiki/",
    tencent_video: "https://v.qq.com/detail/",
    primevideo: "https://www.primevideo.com/detail/",
    netflix: "https://www.netflix.com/title/",
    hidive: "https://www.hidive.com/tv/",
    douban: "https://movie.douban.com/subject/",
    baidu: "https://baike.baidu.com/item/",
    imdb: "https://www.imdb.com/title/",
    amazon_dp: "https://www.amazon.com/dp/",
    tmdb: "https://www.themoviedb.org/movie/",
  };

  const externalLinksObject: ExternalLinksProps = Object.entries(
    externalLinks
  ).reduce((acc, [key, value]) => {
    if (value !== null && linkTemplates[key as keyof typeof linkTemplates]) {
      acc[key as keyof ExternalLinksProps] = `${
        linkTemplates[key as keyof typeof linkTemplates]
      }${value}`;
    }
    return acc;
  }, {} as ExternalLinksProps);

  const studio = creators?.find(
    (creator) => creator.type === "Animation Work" || creator.type === "Work"
  )?.name;

  return (
    <Card className="border-x-0 border-y-2 rounded-none w-full mt-6">
      <CardContent className="px-5 py-[18px]">
        <div className="flex flex-wrap gap-x-6 gap-y-4 justify-center sm:justify-start">
          {anime.rating && (
            <Badge className="dark:text-white dark:bg-transparent dark:ring-1 dark:ring-white">
              {anime.rating}
            </Badge>
          )}

          {anime.start_date && (
            <div className="text-[12px] not-italic font-medium leading-[20px]">
              {seasonYear}
            </div>
          )}
          {anime.type && (
            <div className="text-[12px] not-italic font-medium leading-[20px]">
              {anime.type}
            </div>
          )}
          {studio && (
            <div className="text-[12px] not-italic font-medium leading-[20px]">
              {studio}
            </div>
          )}

          {externalLinksObject &&
            Object.entries(externalLinksObject)
              .filter(([key]) => key !== "id")
              .map(([key, value]) => (
                <Link
                  href={String(value)}
                  target="_blank"
                  rel="noopener noreferrer"
                  key={key}
                  className="text-[12px] not-italic font-medium leading-[20px]"
                >
                  <div className="flex gap-x-1">
                    <div className="capitalize">{key}</div>
                    <ArrowUpRight size={12} />
                  </div>
                </Link>
              ))}
        </div>
      </CardContent>
    </Card>
  );
}
