import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { Card } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { db } from '@/db'
import { format, parseISO } from 'date-fns'
import Image from 'next/image'
import Link from 'next/link'

async function getUserLibrary(username: string) {
  const res = await fetch(
    `${process.env.BACKEND_BASE_URL}user-media/library/${username}`,
    {
      method: 'GET',
      cache: 'no-store',
    }
  )
  const data = await res.json()
  return data
}

async function getProfileData(username: string) {
  const profile = await db.profile.findFirst({
    where: { username: username },
    select: { banner_image: true, image: true, bio: true },
  })
  return profile
}

export default async function Profile({
  params,
}: {
  params: { username: string }
}) {
  const userLibraryData = getUserLibrary(params.username)
  const profileData = getProfileData(params.username)
  const [userLibrary, profile] = await Promise.all([
    userLibraryData,
    profileData,
  ])

  return (
    <>
      <Image
        src={
          profile?.banner_image ??
          `https://tofutrackeranime2.b-cdn.net/mountains.webp`
        }
        width={1920}
        height={360}
        alt="Banner Picture"
        className="h-[360px] w-full object-cover"
      />
      <div className="mx-auto mt-6 flex w-full px-3 max-sm:flex-col max-sm:space-y-6 sm:space-x-9 lg:space-x-12 xl:px-14 2xl:px-44">
        <div className="flex h-full w-full flex-grow basis-2/6 lg:basis-3/12">
          <div className="flex justify-center sm:w-full">
            <div className="flex max-sm:space-x-6 sm:flex-col">
              <Avatar className="size-12 sm:size-24">
                <AvatarImage
                  src={profile?.image ?? `https://github.com/shadcn.png`}
                  width={96}
                  height={96}
                  alt="Banner Picture"
                  className="overflow-hidden rounded-md"
                />
              </Avatar>
              <div className="flex flex-col">
                <h4 className="flex w-full justify-center">
                  {params.username.replace('%20', '-')}
                </h4>
                <p className="detail flex w-full">{profile?.bio}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col space-y-9 sm:basis-4/5 lg:basis-9/12">
          <div className="">
            <Card className="grid grid-cols-4 gap-4 rounded-none border-l-0 border-r-0 p-4 max-lg:grid-cols-2">
              <div className="detail text-center">
                Joined{' '}
                {format(
                  parseISO(userLibrary.data.profile.created_at),
                  'MMMM yyyy'
                )}
              </div>
              <div className="detail text-center">893 hrs watched</div>
              <div className="detail text-center">Action</div>
              <div className="detail text-center">293 likes recieved</div>
            </Card>
          </div>
          <div className="w-full">
            <Tabs defaultValue="activity" className="mb-6">
              <TabsList className="w-full justify-between space-x-6">
                <TabsTrigger value="activity" className="w-full">
                  Activity
                </TabsTrigger>
                <TabsTrigger value="movies" className="w-full">
                  Movies
                </TabsTrigger>
                <TabsTrigger value="tv" className="w-full">
                  TV
                </TabsTrigger>
                <TabsTrigger value="anime" className="w-full">
                  Anime
                </TabsTrigger>
              </TabsList>
              <TabsContent value="activity" className="mt-6">
                {userLibrary.data.userMediaItems.length ? (
                  <div className="grid grid-cols-3 gap-1 sm:gap-2 lg:grid-cols-4">
                    {userLibrary.data.userMediaItems.map((item: any) => (
                      <div
                        className="relative aspect-[2/3] w-full"
                        key={item.id}
                      >
                        {item.media_type !== 'ANIME' && (
                          <Link
                            href={`/profile/${params.username}/activity/${item.id}`}
                          >
                            <Image
                              src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                              alt={`Poster ${item.title}`}
                              className="h-full w-full rounded-sm object-cover"
                              width={500}
                              height={750}
                            />
                          </Link>
                        )}
                        {item.media_type === 'ANIME' && (
                          <Image
                            src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                            alt={`Poster ${item.title}`}
                            className="h-full w-full rounded-sm object-cover"
                            width={500}
                            height={750}
                          />
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex w-full justify-center">
                    No activity found for user {params.username}
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </>
  )
}
