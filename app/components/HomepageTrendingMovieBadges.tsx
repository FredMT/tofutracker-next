import { Badge } from "@/components/ui/badge";
import React from "react";

type Props = {
  genre_ids: number[];
};

const genreMap: { [key: number]: string } = {
  28: "Action",
  12: "Adventure",
  16: "Animation",
  35: "Comedy",
  80: "Crime",
  99: "Documentary",
  18: "Drama",
  10751: "Family",
  14: "Fantasy",
  36: "History",
  27: "Horror",
  10402: "Music",
  9648: "Mystery",
  10749: "Romance",
  878: "Science Fiction",
  10770: "TV Movie",
  53: "Thriller",
  10752: "War",
  37: "Western",
};

export default function HomepageTrendingMovieBadges({ genre_ids }: Props) {
  return (
    <div className="absolute bottom-5 left-0 right-0 mx-auto flex justify-center">
      <div className="flex gap-x-4">
        {genre_ids.map((id, index) => (
          <Badge key={index}>{genreMap[id]}</Badge>
        ))}
      </div>
    </div>
  );
}
