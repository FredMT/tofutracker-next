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
import { createClient } from "@/utils/supabase/client";

export default function ItemRating({
  item_id,
  item_type,
  currentRating,
}: {
  item_id: number;
  item_type: string;
  currentRating: number;
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="w-full flex justify-start" variant="secondary">
          {currentRating !== -1 ? (
            <Star className="mr-2 fill-yellow-500" />
          ) : (
            <Star className="mr-2 " />
          )}{" "}
          {currentRating !== -1 ? `Your rating: ${currentRating}` : "Rate"}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[80vw] flex justify-center">
        <DropdownMenuItem>
          <Rating
            value={currentRating !== -1 ? currentRating : 0}
            totalStars={10}
            precision={1}
            onRatingChange={(rating: number) =>
              setRating(rating, item_id, item_type)
            }
          />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
