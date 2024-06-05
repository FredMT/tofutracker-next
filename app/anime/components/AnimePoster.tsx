import Image from "next/image";
import React from "react";
import AnimeLibraryButton from "./AnimeLibraryButton";
import { addAnimeToLibrary, removeAnimeFromLibrary } from "./actions";
import { createClient } from "@/utils/supabase/server";
import ItemRating from "@/app/components/ItemRating";

type Images = {
  aspect_ratio: number;
  file_path: string;
  height: number;
  iso_639_1: string;
  vote_average: number;
  vote_count: number;
  width: number;
};

async function getAnimeImages(type: string, id: number) {
  const url = `https://tofutracker-3pt5y.ondigitalocean.app/api/getanimeimages/${type}/${id}`;
  const data = await fetch(url);
  const result = await data.json();
  return result.data;
}

async function checkAnimeInLibrary(id: number, user_id: string) {
  const url = `http://localhost:8080/api/checkanimeinlibrary/${id}/${user_id}`;
  const data = await fetch(url);
  const result = await data.json();
  return result.data;
}

async function getCurrentRating(
  item_id: number,
  user_id: string
): Promise<number> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("item_lists")
    .select("*")
    .eq("item_id", item_id)
    .eq("user_id", user_id)
    .eq("item_type", "anime");

  if (error) {
    console.error("Error fetching rating:", error);
    return -1; // or handle the error as appropriate
  }

  if (data && data.length > 0 && Boolean(data[0].rating)) {
    return data[0].rating;
  } else {
    return -1;
  }
}

export default async function AnimePoster({
  title,
  type,
  poster,
  id,
}: {
  title: string;
  type: string;
  poster: string;
  id: number;
}) {
  let images;
  let poster_path;

  type !== "Movie"
    ? (images = await getAnimeImages("tv", id))
    : (images = await getAnimeImages("movie", id));

  if (images?.posters && images.posters.length > 0) {
    const highestRatedPoster = images.posters.reduce(
      (prev: Images, current: Images) =>
        prev.vote_average > current.vote_average ? prev : current
    );
    poster_path =
      "https://image.tmdb.org/t/p/w440_and_h660_face" +
      highestRatedPoster.file_path;
  } else {
    poster_path = `https://cdn.anidb.net/images/main/${poster}`;
  }

  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  let isInLibrary = false;
  let currentRating: number = -1;

  if (user) {
    isInLibrary = await checkAnimeInLibrary(id, user.id);
    currentRating = await getCurrentRating(id, user.id);
  }

  return (
    <div className="flex flex-col gap-y-6">
      <Image
        className="w-[124px] h-[186px] sm:min-w-[182px] sm:h-[273px] md:min-w-[224px] md:h-[336px] object-cover rounded-sm border border-muted"
        src={poster_path}
        alt={title}
        width={600}
        height={900}
        priority
      />
      <div className="sm:flex sm:flex-col gap-y-4 hidden">
        <AnimeLibraryButton
          id={id}
          addAnimeToLibrary={addAnimeToLibrary}
          removeAnimeFromLibrary={removeAnimeFromLibrary}
          user={user}
          isInLibrary={isInLibrary}
        />
        {/* <Button className="w-full">Add to Watchlist</Button> */}
        {/* <Button className="w-full">Add to Custom List</Button> */}
        <ItemRating
          item_id={id}
          item_type="anime"
          currentRating={currentRating}
        />
        {/* <Button className="w-full">Watch</Button> */}
      </div>
    </div>
  );
}
