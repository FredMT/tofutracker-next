"use server";

import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import SettingsAccordion from "./components/SettingsAccordion";

export default async function Settings({
  params,
}: {
  params: { username: string };
}) {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/");
  }

  const { data, error } = await supabase
    .from("profile")
    .select("id")
    .eq("username", params.username)
    .single();

  if (error) {
    console.error(error.message);
    return;
  }

  if (user.id !== data.id) {
    return redirect("/");
  }

  return (
    <div className="mt-20 px-6 text-2xl">
      Settings
      <SettingsAccordion />
    </div>
  );
}
