import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { DialogContent } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import { createClient } from "@/utils/supabase/server";
import CommentList from "./CommentList";
import { formatDistanceToNowStrict } from "date-fns";
import { likeActivity, likeComment, createComment } from "./actions";
import ActivityLike from "./ActivityLike";

type Item = {
  item_id: number;
  item_created_at: string;
  item_type: string;
  item_poster: string;
  item_title: string;
  activity_id: string;
  hasLiked?: boolean;
  likes: number;
};
export default async function ActivityDialog({
  item,
  username,
  hasLiked,
}: {
  item: Item;
  username: string;
  hasLiked: boolean;
}) {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <DialogContent className="min-h-full sm:min-h-[500px] md:max-w-[85vw] p-6 flex overflow-y-scroll max-h-screen">
      <div className="flex max-md:flex-col gap-5 w-screen">
        <div className="flex gap-2 items-center md:hidden">
          <Avatar className="size-8">
            <AvatarImage src="https://github.com/shadcn.png" />
          </Avatar>

          <div className="  text-sm font-semibold">{username}</div>
          <div className="  text-sm text-muted-foreground">
            {formatDistanceToNowStrict(new Date(item.item_created_at))} ago
          </div>
        </div>

        <div className="flex justify-center md:justify-center md:flex-col md:gap-4 md:max-w-[224px]">
          <Image
            src={item.item_poster}
            alt={item.item_title}
            width={1080}
            height={1920}
            className=" rounded-md sm:w-[300px] sm:h-[450px] md:w-[224px] md:h-[336px]"
          />
          <ActivityLike
            hasLiked={hasLiked}
            likes={item.likes}
            username={username}
            title={item.item_title}
            activity_id={item.activity_id}
            likeActivity={likeActivity}
            userId={user?.id!}
          />
        </div>

        <div className="flex flex-col max-md:hidden w-full gap-4 max-h-[472px] ">
          <div className="flex gap-4 items-center">
            <Avatar className="size-8">
              <AvatarImage src="https://github.com/shadcn.png" />
            </Avatar>
            <div className="  text-sm font-medium">{username}</div>
            <div className="  text-sm text-muted-foreground">
              {formatDistanceToNowStrict(new Date(item.item_created_at))} ago
            </div>
          </div>

          <Separator className="my-2" />

          <CommentList
            activity_id={item.activity_id}
            user={user!}
            username={username}
            likeComment={likeComment}
            createComment={createComment}
          />
        </div>

        <div className="flex flex-col gap-2 md:hidden">
          <ActivityLike
            hasLiked={hasLiked}
            likes={item.likes}
            username={username}
            title={item.item_title}
            activity_id={item.activity_id}
            likeActivity={likeActivity}
            userId={user?.id!}
          />
        </div>

        <Separator className="my-2 md:hidden" />

        <div className="md:hidden flex flex-col gap-4">
          <CommentList
            activity_id={item.activity_id}
            user={user!}
            username={username}
            likeComment={likeComment}
            createComment={createComment}
          />
        </div>
      </div>
    </DialogContent>
  );
}
