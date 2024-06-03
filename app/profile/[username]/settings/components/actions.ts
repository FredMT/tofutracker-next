"use server";
import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export const getActivityPrivacySetting = async (
  user_id: string,
  username: string
) => {
  "use server";
  const supabase = createClient();
  const { data, error } = await supabase
    .from("profile")
    .select("activity_is_private")
    .eq("id", user_id)
    .single();

  if (error) {
    console.error(error.message);
    return;
  }
  revalidatePath(`/profile/${username}/settings`);
  return data.activity_is_private;
};

type ActivityPrivacyData = {
  activity_privacy: boolean;
};

export const updateActivityPrivacySetting = async (
  data: ActivityPrivacyData,
  user_id: string,
  username: string
) => {
  "use server";
  const supabase = createClient();

  const { error } = await supabase
    .from("profile")
    .update({ activity_is_private: data.activity_privacy })
    .eq("id", user_id);

  if (!error) {
    revalidatePath(`/profile/${username}/settings`);
  }
};
