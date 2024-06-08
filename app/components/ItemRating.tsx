"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Star } from "lucide-react";
import Rating from "./Rating";
import { setRating } from "../movie/components/actions";
import { startTransition } from "react";

export default function ItemRating({
  item_id,
  item_type,
  optimisticIsInLibrary,
  setOptimisticIsInLibrary,
  optimisticCurrentRating,
  setOptimisticCurrentRating,
}: {
  item_id: number;
  item_type: string;
  optimisticIsInLibrary: boolean;
  setOptimisticIsInLibrary: (value: boolean) => void;
  optimisticCurrentRating: number;
  setOptimisticCurrentRating: (value: number) => void;
}) {
  optimisticCurrentRating = optimisticIsInLibrary
    ? optimisticCurrentRating
    : -1;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="w-full flex justify-start" variant="secondary">
          {optimisticCurrentRating !== -1 ? (
            <Star className="mr-2 fill-yellow-500" />
          ) : (
            <Star className="mr-2 " />
          )}{" "}
          {optimisticCurrentRating !== -1
            ? `Your rating: ${optimisticCurrentRating}`
            : "Rate"}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[80vw] flex justify-center">
        <DropdownMenuItem>
          <Rating
            value={optimisticCurrentRating !== -1 ? optimisticCurrentRating : 0}
            totalStars={10}
            precision={1}
            size={2}
            onRatingChange={(rating: number) => {
              startTransition(() => {
                setRating(rating, item_id, item_type);
                if (!optimisticIsInLibrary) {
                  setOptimisticIsInLibrary(true);
                }
                setOptimisticCurrentRating(rating);
              });
            }}
          />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
