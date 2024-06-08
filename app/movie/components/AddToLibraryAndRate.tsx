"use client";

import ItemRating from "@/app/components/ItemRating";
import { Button } from "@/components/ui/button";
import { Library } from "lucide-react";
import { startTransition, useOptimistic } from "react";

export default function AddToLibraryAndRate({
  addOrRemoveFromLibrary,
  userId,
  itemId,
  itemType,
  isInLibrary,
  currentRating,
}: {
  addOrRemoveFromLibrary: (formData: FormData) => void;
  userId: string;
  itemId: number;
  itemType: string;
  isInLibrary: boolean;
  currentRating: number;
}) {
  const [optimisticIsInLibrary, setOptimisticIsInLibrary] = useOptimistic(
    isInLibrary,
    (isInLibrary) => {
      return !isInLibrary;
    }
  );

  const [optimisticCurrentRating, setOptimisticCurrentRating] = useOptimistic(
    currentRating,
    (currentRating, newRating: number) => newRating
  );

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    addOrRemoveFromLibrary(new FormData(event.currentTarget));
    startTransition(() => {
      setOptimisticIsInLibrary(!optimisticIsInLibrary);
    });
  };

  return (
    <>
      <div className="w-full relative">
        <form onSubmit={handleSubmit}>
          <input type="hidden" name="user_id" value={userId} />
          <input type="hidden" name="item_id" value={itemId} />
          <input type="hidden" name="list_type" value="Library" />
          <input type="hidden" name="item_type" value={itemType} />
          <input
            type="hidden"
            name="isInLibrary"
            value={optimisticIsInLibrary.toString()}
          />
          <Button className="w-full flex justify-between" type="submit">
            <div className="flex gap-x-2">
              <Library />
              <span>
                {optimisticIsInLibrary
                  ? "Remove from Library"
                  : "Add to Library"}
              </span>
            </div>
          </Button>
        </form>
      </div>
      <ItemRating
        item_id={itemId}
        item_type={itemType}
        optimisticIsInLibrary={optimisticIsInLibrary}
        setOptimisticIsInLibrary={setOptimisticIsInLibrary}
        optimisticCurrentRating={optimisticCurrentRating}
        setOptimisticCurrentRating={setOptimisticCurrentRating}
      />
    </>
  );
}
