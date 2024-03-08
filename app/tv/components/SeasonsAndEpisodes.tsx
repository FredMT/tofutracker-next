"use client";
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import useSWR from "swr";
import { useParams } from "next/navigation";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import Episodes from "./Episodes";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

type Season = {
  air_date: string;
  episode_count: number;
  id: number;
  name: string;
  overview: string;
  poster_path: string | null;
  season_number: number;
};

export default function SeasonsAndEpisodes() {
  const slug = useParams().id;
  const id = typeof slug === "string" ? slug.split("-")[0] : slug[0];
  const [selectedSeason, setSelectedSeason] = React.useState("Season 1");
  const [seasonNumber, setSeasonNumber] = React.useState(1);
  const [isDataReady, setIsDataReady] = React.useState(false);

  const fetcher = (url: string) => fetch(url).then((res) => res.json());

  const {
    data: fetchedData,
    error,
    isLoading,
  } = useSWR(
    `https://jellyfish-app-lmbt9.ondigitalocean.app/api/gettv/${id}`,
    fetcher
  );

  const {
    data: seasonData,
    error: seasonDataError,
    isLoading: seasonDataLoading,
  } = useSWR(
    `https://jellyfish-app-lmbt9.ondigitalocean.app/api/gettvseason/${id}/${seasonNumber}`,
    fetcher
  );

  React.useEffect(() => {
    if (fetchedData && fetchedData.seasons) {
      const hasSeasonOne = fetchedData.seasons.some(
        (season: Season) => season.name === "Season 1"
      );
      const defaultSeason = hasSeasonOne ? "Season 1" : "Miniseries";
      setSelectedSeason((prevSelectedSeason) => {
        if (prevSelectedSeason === "Season 1" && !hasSeasonOne) {
          return "Miniseries";
        }
        return prevSelectedSeason;
      });
      setSeasonNumber(
        fetchedData.seasons.find(
          (season: Season) => season.name === defaultSeason
        )?.season_number
      );
      setIsDataReady(true);
    }
  }, [fetchedData]);

  if (error) return <div>Failed to load</div>;

  if (isLoading) return <div>Loading...</div>;

  if (isDataReady) {
    return (
      <Card className="border-x-0 border-t-0 rounded-none pb-8">
        <Tabs value={selectedSeason} className="w-full">
          <ScrollArea
            className="relative mb-4 rounded-md h-12 sm:w-[60vw] "
            type="always"
          >
            <TabsList className="bg-transparent">
              {fetchedData.seasons.map((season: Season) => (
                <TabsTrigger
                  key={season.id}
                  value={season.name}
                  onClick={() => {
                    setSelectedSeason(season.name);
                    setSeasonNumber(season.season_number);
                  }}
                  className="data-[state=active]:border-b-2 rounded-none border-primary"
                >
                  <div className="flex gap-x-2">
                    <div className="text-primary">{season.name}</div>
                    <Badge className="bg-background text-primary border-primary">
                      {season.episode_count}
                    </Badge>
                  </div>
                </TabsTrigger>
              ))}
            </TabsList>

            <ScrollBar orientation="horizontal" />
          </ScrollArea>
          {isDataReady && (
            <TabsContent value={selectedSeason}>
              <Episodes
                seasonData={seasonData}
                seasonDataError={seasonDataError}
                seasonDataLoading={seasonDataLoading}
              />
            </TabsContent>
          )}
        </Tabs>
      </Card>
    );
  }
}
