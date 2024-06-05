import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function addAnimeToLibrary(formData: FormData) {
  "use server";
  const supabase = createClient();

  const user_id = formData.get("user_id");
  const anime_id = formData.get("anime_id");
  const list_type = formData.get("list_type");

  const { error } = await supabase.from("item_lists").insert({
    user_id,
    item_id: anime_id,
    list_type,
    item_type: "anime",
  });

  if (error) {
    console.log(error);
    return redirect(`/anime/${anime_id}`);
  }
  revalidatePath(`/anime/${anime_id}`);
}

export async function removeAnimeFromLibrary(formData: FormData) {
  "use server";

  const supabase = createClient();

  const user_id = formData.get("user_id");
  const anime_id = formData.get("anime_id");

  const { error } = await supabase
    .from("item_lists")
    .delete()
    .eq("user_id", user_id)
    .eq("item_id", anime_id)
    .eq("item_type", "anime")
    .eq("list_type", "Library");

  if (error) {
    console.log(error);
  }

  revalidatePath(`/anime/${anime_id}`);
}
