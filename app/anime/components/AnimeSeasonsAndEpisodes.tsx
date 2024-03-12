"use client";

import { useParams } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React from "react";
import useSWR from "swr";
import { Card } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import AnimeEpisodes from "./AnimeEpisodes";
import { Skeleton } from "@/components/ui/skeleton";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

type AnimeSeasonResponse = {
  success: boolean;
  data: AnimeSeason[];
};

type AnimeSeason = {
  sequel_id: number;
};

type AnimeRelationsResponse = {
  success: boolean;
  message: string;
  data: AnimeRelation[] | string;
};

type AnimeRelation = {
  anime_id: number;
  related_id: number;
  type: string;
};

type AnimeEpisodesResponse = {
  success: boolean;
  data: AnimeEpisode[];
};

type AnimeEpisode = {
  air_date: string;
  episode_number: number;
  episode_name: string;
  episode_overview: string;
  runtime: number;
  still_path: string;
};

export default function AnimeSeasonsAndEpisodes({
  start_date,
  end_date,
}: {
  start_date: string;
  end_date: string;
}) {
  const slug = useParams().id;
  const router = useRouter();
  const id = typeof slug === "string" ? slug.split("-")[0] : slug[0];
  const [selectedSeason, setSelectedSeason] = React.useState(id);
  const fetcher = (url: string) => fetch(url).then((res) => res.json());

  const {
    data: fetchedData,
    error,
    isLoading,
  } = useSWR<AnimeSeasonResponse>(
    `https://jellyfish-app-lmbt9.ondigitalocean.app/api/getanimechain/${id}`,
    fetcher
  );

  const {
    data: relations,
    error: relationsError,
    isLoading: relationsLoading,
  } = useSWR<AnimeRelationsResponse>(
    `http://localhost:8080/api/getanimerelations/${parseInt(selectedSeason)}`,
    fetcher
  );

  const {
    data: episodes,
    error: episodesError,
    isLoading: episodesLoading,
  } = useSWR<AnimeEpisodesResponse>(
    `http://localhost:8080/api/getanimeepisodes/${parseInt(
      selectedSeason
    )}/${start_date}/${end_date}`,
    fetcher
  );

  if (error || relationsError || episodesError) console.log(error);

  if (isLoading || relationsLoading || episodesLoading)
    return <Skeleton className="w-full h-[500px] mt-6" />;

  const getBackgroundColor = (sequelId: string) => {
    if (relations && relations.success && Array.isArray(relations.data)) {
      const relation = relations.data.find(
        (rel) => rel.related_id.toString() === sequelId
      );
      if (relation) {
        return relation.type === "Sequel"
          ? "text-purple-500 "
          : relation.type === "Prequel"
          ? "text-orange-500"
          : "";
      }
    }
    return "bg-transparent rounded-none data-[state=active]:border-b-2 border-white";
  };

  function handleSeasonChange(id: string) {
    setSelectedSeason(id);
    router.push(`/anime/${id}`);
  }

  return (
    <Card className="border-x-0 border-t-0 rounded-none pb-8">
      <Tabs value={selectedSeason}>
      <ScrollArea
            className="relative mb-4 rounded-md h-12 sm:w-[60vw] "
            type="always"
          >
        <TabsList className="bg-transparent">
          {fetchedData?.data?.map((item: AnimeSeason, index: number) => (
            <TabsTrigger
              key={item.sequel_id}
              value={item.sequel_id.toString()}
              onClick={() => handleSeasonChange(item.sequel_id.toString())}
              className={getBackgroundColor(item.sequel_id.toString())}
            >
              {`Season ${index + 1}`}
            </TabsTrigger>
          ))}
        </TabsList>
        <ScrollBar orientation="horizontal" />
          </ScrollArea>
        <TabsContent value={selectedSeason}>
          {episodes?.data && <AnimeEpisodes episodes={episodes?.data} />}
        </TabsContent>
      </Tabs>
    </Card>
  );
}
