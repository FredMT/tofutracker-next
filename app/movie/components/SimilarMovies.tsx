"use client";
import React from "react";
import SimilarMedia from "@/app/components/SimilarMedia";

type Movie = {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
};

export default function SimilarMovies({ similar }: { similar: Movie[] }) {
  const similarMovies = similar
    .filter((content: Movie) => content.poster_path !== null)
    .map((content) => ({
      id: content.id,
      title: content.title,
      poster_path: content.poster_path,
      popularity: content.popularity, // Keep as number
      release_date: content.release_date,
      vote_average: content.vote_average,
    }))
    .sort((a, b) => b.popularity - a.popularity);

  return <SimilarMedia items={similarMovies} basePath="movie" />;
}
