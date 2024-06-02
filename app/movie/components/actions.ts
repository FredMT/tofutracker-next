"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function addOrRemoveFromLibrary(formData: FormData) {
  const user_id = formData.get("user_id");
  const item_id = formData.get("item_id");
  const list_type = formData.get("list_type");
  const item_type = formData.get("item_type");
  const isInLibrary = formData.get("isInLibrary");

  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user && isInLibrary === "true") {
    const { error } = await supabase
      .from("item_lists")
      .delete()
      .eq("user_id", user_id)
      .eq("item_id", item_id);

    if (error) {
      console.error("Failed to remove from library:", error.message);
    }
    revalidatePath(`/${item_type}/${item_id}`);
  } else if (user && isInLibrary === "false") {
    const { error } = await supabase
      .from("item_lists")
      .insert([{ user_id, item_id, list_type, item_type }]);

    if (error) {
      console.error("Failed to add to library:", error.message);
    }
    revalidatePath(`/${item_type}/${item_id}`);
  } else {
    redirect("/login");
  }
}

export async function setRating(
  rating: number,
  item_id: number,
  item_type: string
) {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    const { error } = await supabase.from("item_lists").upsert(
      {
        user_id: user.id,
        item_id,
        rating,
        item_type,
        list_type: "Library",
      },
      { onConflict: "user_id, item_id" }
    );

    if (error) {
      console.error("Failed to set rating:", error.message);
    }
    revalidatePath(`/${item_type}/${item_id}`);
  } else {
    redirect("/login");
  }
}
