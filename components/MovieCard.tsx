import React from "react";
import { Card } from "./ui/card";
import Image from "next/image";
import Link from "next/link";

type Movie = {
  id: number;
  title: string;
  poster_path: string;
  year: string;
  rating: number;
  media_type: string;
};

export default function MovieCard({
  id,
  title,
  poster_path,
  year,
  rating,
  media_type,
}: Movie) {
  return (
    <Card className="min-w-[112px] min-h-[260px] sm:min-w-[140px] sm:min-h-[302px] border-0">
      <Link
        href={`/${media_type}/${id}-${title
          .replace(/ /g, "-")
          .replace(/:/g, "")}`}
      >
        <div>
          <Image
            className="w-full object-cover rounded-sm lg:w-[140px] lg:h-[210px]"
            src={
              media_type !== "anime"
                ? `https://image.tmdb.org/t/p/w440_and_h660_face${poster_path}`
                : `https://cdn.anidb.net/images/main/${poster_path}`
            }
            alt={title}
            width={112}
            height={168}
            sizes="100vw"
          />
        </div>
      </Link>
      <div className="flex flex-col gap-y-2 mt-4">
      <Link
        href={`/${media_type}/${id}-${title
          .replace(/ /g, "-")
          .replace(/:/g, "")}`}
      >
          <h3 className="text-[14px] leading-6 font-semibold line-clamp-2 text-secondary-foreground">
            {title}
          </h3>
        </Link>

        <span className="text-xs text-muted-foreground flex gap-1">
          <div>{year && <p>{`${year}`}</p>}</div>
          <div>{rating > 0 && <p>{`• ${rating}`}</p>}</div>
        </span>
      </div>
    </Card>
  );
}
