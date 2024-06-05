"use server";
import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export const toggleLike = async (formData: FormData) => {
  "use server";
  const supabase = createClient();
  const activity_id = formData.get("activity_id");
  const user_id = formData.get("user_id");

  const { data: likesData, error: likesError } = await supabase
    .from("likes")
    .select("*")
    .eq("activity_id", activity_id)
    .eq("user_id", user_id)
    .maybeSingle();

  if (likesError) {
    console.log(likesError);
    return;
  }

  if (likesData) {
    await supabase.from("likes").delete().eq("id", likesData.id);
  } else {
    await supabase.from("likes").insert([{ activity_id, user_id }]);
  }

  revalidatePath(`/activity/${activity_id}`);
};
