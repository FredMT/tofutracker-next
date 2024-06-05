import { Button } from "@/components/ui/button";
import Image from "next/image";
import React from "react";

export default async function Poster({
  poster_path,
  title,
}: {
  poster_path: string;
  title: string;
}) {
  return (
    <div className="flex flex-col gap-y-6 max-w-[182px]">
      <Image
        className="w-[124px] h-[186px] sm:w-[182px] sm:h-[273px] object-cover rounded-sm border border-muted"
        src={`https://image.tmdb.org/t/p/original${poster_path}`}
        alt={title}
        width={600}
        height={900}
        priority
      />
      <div className="sm:flex sm:flex-col gap-y-4 hidden">
        <Button className="w-full">Add to Library</Button>
        {/* <Button className="w-full">Add to Watchlist</Button> */}
        {/* <Button className="w-full">Add to Custom List</Button> */}
        <Button className="w-full">Rate</Button>
        {/* <Button className="w-full">Watch</Button> */}
      </div>
    </div>
  );
}
