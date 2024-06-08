import Image from "next/image";
import React from "react";

export default async function Backdrop({
  backdrop_path,
  title,
  logo_path,
}: {
  backdrop_path: string;
  title: string;
  logo_path: string;
}) {
  return (
    <div className="relative">
      <Image
        className="w-full h-[288px] sm:w-full sm:h-[576px] object-cover"
        src={`https://image.tmdb.org/t/p/original${backdrop_path}`}
        alt={title}
        width={1920}
        height={1080}
        priority
      />
      <Image
        src={`https://image.tmdb.org/t/p/original${logo_path}`}
        alt={title}
        width={1920}
        height={1080}
        className="absolute -bottom-[45%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[200px] sm:w-[400px] h-[200px] sm:h-[400px] object-contain"
      />
      <div className="absolute bottom-0 left-0 right-0 flex justify-center bg-gradient-to-t from-black to-transparent p-12 opacity-35" />
      <div className="absolute top-0 left-0 right-0 flex justify-center bg-gradient-to-b from-black to-transparent p-12 opacity-50" />
    </div>
  );
}
