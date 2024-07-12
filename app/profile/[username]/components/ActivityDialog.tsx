import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { DialogContent } from '@/components/ui/dialog'
import { Separator } from '@/components/ui/separator'
import Image from 'next/image'
import CommentList from './CommentList'
import { formatDistanceToNowStrict } from 'date-fns'
import ActivityLike from './ActivityLike'
import MobileActivityLike from './MobileActivityLike'
import getUser from '@/hooks/useUser'

type Item = {
  item_id: number
  item_created_at: string
  item_type: string
  item_poster: string
  item_title: string
  activity_id: string
  hasLiked?: boolean
  likes: number
}
export default async function ActivityDialog({
  item,
  username,
  hasLiked,
}: {
  item: Item
  username: string
  hasLiked: boolean
}) {
  const user = await getUser()

  return (
    <DialogContent className="flex max-h-screen min-h-full overflow-y-scroll p-6 sm:min-h-[500px] md:max-w-[85vw]">
      <div className="flex w-screen gap-5 max-md:flex-col">
        <div className="flex items-center gap-2 md:hidden">
          <Avatar className="size-8">
            <AvatarImage src={user?.user_metadata.profile_picture} />
          </Avatar>

          <div className="text-sm font-semibold">{username}</div>
          <div className="text-sm text-muted-foreground">
            {formatDistanceToNowStrict(new Date(item.item_created_at))} ago
          </div>
        </div>

        <div className="flex justify-center md:max-w-[224px] md:flex-col md:justify-center md:gap-4">
          <Image
            src={item.item_poster}
            alt={item.item_title}
            width={1080}
            height={1920}
            className="rounded-md sm:h-[450px] sm:w-[300px] md:h-[336px] md:w-[224px]"
          />
          <ActivityLike
            hasLiked={hasLiked}
            likes={item.likes}
            username={username}
            title={item.item_title}
            activity_id={item.activity_id}
            userId={user?.id!}
            item_type={item.item_type}
            item_id={item.item_id}
          />
        </div>

        <div className="flex max-h-[472px] w-full flex-col gap-4 max-md:hidden">
          <div className="flex items-center gap-4">
            <Avatar className="size-8">
              <AvatarImage src={user?.user_metadata.profile_picture} />
            </Avatar>
            <div className="text-sm font-medium">{username}</div>
            <div className="text-sm text-muted-foreground">
              {formatDistanceToNowStrict(new Date(item.item_created_at))} ago
            </div>
          </div>

          <Separator className="my-2" />

          <CommentList
            activity_id={item.activity_id}
            user={user!}
            username={username}
          />
        </div>

        <div className="flex flex-col gap-2 md:hidden">
          <MobileActivityLike
            hasLiked={hasLiked}
            likes={item.likes}
            username={username}
            title={item.item_title}
            activity_id={item.activity_id}
            userId={user?.id!}
            item_type={item.item_type}
            item_id={item.item_id}
          />
        </div>

        <Separator className="my-2 md:hidden" />

        <div className="flex flex-col gap-4 md:hidden">
          <CommentList
            activity_id={item.activity_id}
            user={user!}
            username={username}
          />
        </div>
      </div>
    </DialogContent>
  )
}
