import { createClient } from "@/utils/supabase/server";
import { addOrRemoveFromLibrary } from "../movie/components/actions";
import AddToLibraryAndRate from "../movie/components/AddToLibraryAndRate";

export default async function MobileButtons({
  item_id,
  item_type,
}: {
  item_id: number;
  item_type: string;
}) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  let isInLibrary = false;
  let currentRating = -1;

  if (user) {
    const { data, error } = await supabase
      .from("item_lists")
      .select("*")
      .eq("item_id", item_id)
      .eq("user_id", user.id);
    if (error) {
      console.error("Failed to fetch library:", error.message);
    } else {
      if (data.length > 0) {
        isInLibrary = true;
        currentRating = data[0].rating || -1;
      }
    }
  }

  return (
    <div className="flex flex-col w-full gap-y-4">
      <AddToLibraryAndRate
        addOrRemoveFromLibrary={addOrRemoveFromLibrary}
        userId={user?.id!}
        itemId={item_id}
        itemType={item_type}
        isInLibrary={isInLibrary}
        currentRating={currentRating}
      />
    </div>
  );
}
