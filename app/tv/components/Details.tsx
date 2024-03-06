import { Card } from "@/components/ui/card";
import React from "react";

type Creator = {
  id: number;
  credit_id: string;
  name: string;
  gender: number;
  profile_path: string | null;
};

type ProductionCompany = {
  id: number;
  logo_path: string | null;
  name: string;
  origin_country: string;
};

type Props = {
  type: string;
  status: string;
  creators: Creator[];
  production_companies: ProductionCompany[];
  seasons: number;
  episodes: number;
};

export default async function Details({
  status,
  creators,
  production_companies,
  seasons,
  episodes,
  type,
}: Props) {
  return (
    <Card className="border-x-0 border-t-0 rounded-none pb-8">
      <div className="grid grid-cols-[75px_auto] gap-y-2 lg:grid-cols-[75px_1fr_75px_1fr] lg:gap-y-4 mt-4">
        <div className="text-[14px] text-muted-foreground font-medium leading-[24px]">
          Type
        </div>
        <div className="text-[14px]  font-medium leading-[24px] ml-6">
          {type}
        </div>
        <div className="text-[14px] text-muted-foreground font-medium leading-[24px]">
          Status
        </div>
        <div className="text-[14px]  font-medium leading-[24px] ml-6">
          {status}
        </div>
        <div className="text-[14px] text-muted-foreground font-medium leading-[24px]">
          Creators
        </div>
        <div className="flex flex-col">
          {creators.map((creator, index) => (
            <p
              key={index}
              className="text-[14px]  font-medium leading-[24px] ml-6"
            >
              {creator.name}
            </p>
          ))}
        </div>
        <div className="text-[14px] text-muted-foreground font-medium leading-[24px]">
          Production Companies
        </div>
        <div className="flex flex-col">
          {production_companies.map((company, index) => (
            <p
              key={index}
              className="text-[14px]  font-medium leading-[24px] ml-6"
            >
              {company.name}
            </p>
          ))}
        </div>
        <div className="text-[14px] text-muted-foreground font-medium leading-[24px]">
          Seasons
        </div>
        <div className="text-[14px]  font-medium leading-[24px] ml-6">
          {seasons}
        </div>
        <div className="text-[14px] text-muted-foreground font-medium leading-[24px]">
          Episodes
        </div>
        <div className="text-[14px]  font-medium leading-[24px] ml-6">
          {episodes}
        </div>
      </div>
    </Card>
  );
}
