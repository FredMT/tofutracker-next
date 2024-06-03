import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { createClient } from "@/utils/supabase/server";
import Image from "next/image";

export default async function Profile({
  params,
}: {
  params: { username: string };
}) {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("profile")
    .select("bio")
    .eq("username", params.username)
    .single();

  if (error) console.log(error.message);

  const { data: userData, error: userError } = await supabase
    .from("profile")
    .select("id")
    .eq("username", params.username)
    .single();

  if (userError) {
    console.error(userError.message);
    return;
  }

  const viewedUserId = userData.id;

  const { data: activityData, error: activityDataError } = await supabase
    .from("item_lists")
    .select("item_id, item_type")
    .eq("user_id", viewedUserId)
    .eq("list_type", "Library")
    .order("created_at", { ascending: false });

  if (activityDataError) {
    console.error(activityDataError.message);
    return;
  }

  // Fetch poster data for each item
  const posterDataPromises = activityData.map((item) =>
    fetch(
      `http://localhost:8080/api/getposter/${item.item_type}/${item.item_id}`
    ).then((response) => response.json())
  );
  const postersData = await Promise.all(posterDataPromises);

  return (
    <div className="mt-20 mx-6">
      <div className="flex gap-6">
        <Avatar className="size-12">
          <AvatarImage
            src="https://github.com/shadcn.png"
            alt="Profile picture"
          />
        </Avatar>
        <div className="flex flex-col">
          <div className="font-syne text-xl font-semibold">
            {params.username}
          </div>
          <div className="text-gray-500">{data?.bio}</div>
        </div>
      </div>

      <div className="text-xl mt-6">Activity</div>
      <Separator className="mt-2" />

      <div className="grid gap-4 mt-6 grid-cols-3 lg:grid-cols-4 place-items-center mb-6">
        {postersData.map((item, index) => (
          <Image
            key={index}
            className="min-w-[88px] min-h-[132px] sm:min-w-[124px] sm:min-h-[186px] md:min-w-[152px] md:min-h-[228px] lg:min-w-[176px] lg:min-h-[264px] xl:min-w-[200px] xl:min-h-[300px]"
            src={item.item_poster}
            alt={item.item_title}
            width={88}
            height={132}
            priority
          />
        ))}
      </div>
    </div>
  );
}
