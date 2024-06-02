"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export async function addOrRemoveFromLibrary(formData: FormData) {
  const user_id = formData.get("user_id");
  const item_id = formData.get("item_id");
  const list_type = formData.get("list_type");
  const item_type = formData.get("item_type");
  const isInLibrary = formData.get("isInLibrary");

  const supabase = createClient();

  if (isInLibrary === "true") {
    const { error } = await supabase
      .from("item_lists")
      .delete()
      .eq("user_id", user_id)
      .eq("item_id", item_id);

    if (error) {
      console.error("Failed to remove from library:", error.message);
    }
    revalidatePath(`/${item_type}/${item_id}`);
  } else {
    const { error } = await supabase
      .from("item_lists")
      .insert([{ user_id, item_id, list_type, item_type }]);

    if (error) {
      console.error("Failed to add to library:", error.message);
    }
    revalidatePath(`/${item_type}/${item_id}`);
  }
}
