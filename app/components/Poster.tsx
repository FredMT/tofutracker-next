import { Button } from "@/components/ui/button";
import Image from "next/image";
import React from "react";
import MobileButtons from "./MobileButtons";

export default async function Poster({
  poster_path,
  title,
  id,
}: {
  poster_path: string;
  title: string;
  id: number;
}) {
  return (
    <div className="flex flex-col gap-y-6 max-w-[182px] ">
      <Image
        className="w-[124px] h-[186px] sm:w-[182px] sm:h-[273px] object-cover rounded-sm border border-muted"
        src={`https://image.tmdb.org/t/p/original${poster_path}`}
        alt={title}
        width={600}
        height={900}
        priority
      />
      <div className="sm:flex sm:flex-col gap-y-4 hidden">
        <MobileButtons item_id={id} item_type="movie" />
      </div>
    </div>
  );
}
