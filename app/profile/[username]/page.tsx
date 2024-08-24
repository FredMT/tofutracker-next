// export const generateMetadata = ({
//   params,
// }: {
//   params: { username: string }
// }): Metadata => {
//   return {
//     title: `${params.username}'s Profile`,
//   }
// }

// async function getActivityData(user_id: string) {
//   const data = await fetch(`http://localhost:8080/api/getposters/${user_id}`, {
//     next: { tags: ['activities'] },
//   }).then((res) => res.json())
//   return data
// }

// async function getActivityDataLoggedInUser(
//   viewed_user_id: string,
//   logged_in_user_id: string
// ) {
//   const data = await fetch(
//     `http://localhost:8080/api/getposters/${viewed_user_id}/${logged_in_user_id}`,
//     { next: { tags: ['activities'] } }
//   ).then((res) => res.json())
//   return data
// }

// async function renderTabContent(
//   activityData: ActivityData,
//   tabType: string,
//   params: { username: string }
// ) {
//   if (activityData.success === false) {
//     return (
//       <div className="flex flex-col">
//         <p className="text-lg text-muted-foreground">
//           {activityData.message === 'Unauthorized'
//             ? 'This user has their activity hidden'
//             : 'Error retrieving user activity'}
//         </p>
//       </div>
//     )
//   }

//   if (activityData.success === true && activityData.posters.length === 0) {
//     return (
//       <div className="flex flex-col">
//         <p className="text-lg text-muted-foreground">
//           This user has no activity yet :(
//         </p>
//       </div>
//     )
//   }

//   let filteredItems = activityData.posters
//   if (tabType !== 'Activity') {
//     filteredItems = activityData.posters.filter(
//       (item) => item.list_type === tabType
//     )
//   } else {
//     filteredItems = activityData.posters.filter(
//       (item) => item.list_type === 'Library' || item.list_type === 'Watchlist'
//     )
//   }

//   return (
//     <div className="my-6 grid grid-cols-3 place-items-center gap-4 sm:grid-cols-4 2xl:grid-cols-5">
//       {filteredItems.map((item: Item) => (
//         <Dialog key={item.activity_id}>
//           <DialogTrigger className="w-fit">
//             <Image
//               key={item.activity_id}
//               className="min-h-[132px] min-w-[88px] rounded-md sm:h-[228px] sm:w-[152px] lg:h-[264px] lg:w-[176px] xl:h-[300px] xl:w-[200px]"
//               src={item.item_poster}
//               alt={item.item_title}
//               width="1080"
//               height="1920"
//               priority
//             />
//           </DialogTrigger>
//           <ActivityDialog
//             item={item}
//             username={params.username}
//             hasLiked={item.hasLiked || false}
//           />
//         </Dialog>
//       ))}
//     </div>
//   )
// }

export default async function Profile({
  params,
}: {
  params: { username: string }
}) {
  return true

  // const supabase = createClient()

  // const {
  //   data: { user },
  // } = await supabase.auth.getUser()

  // const { data, error } = await supabase
  //   .from('profile')
  //   .select('bio')
  //   .eq('username', params.username)
  //   .single()

  // if (error) {
  //   console.log(error.message)
  //   return
  // }

  // const { data: userData, error: userError } = await supabase
  //   .from('profile')
  //   .select('id, profile_banner_picture')
  //   .eq('username', params.username)
  //   .maybeSingle()

  // if (userError) {
  //   console.error(userError.message)
  //   return
  // }

  // if (!userData) {
  //   return notFound()
  // }

  // const viewedUserId = userData.id
  // const viewedUserBannerPicture = userData.profile_banner_picture

  // let activityData
  // if (user) {
  //   activityData = await getActivityDataLoggedInUser(viewedUserId, user.id)
  // } else {
  //   activityData = await getActivityData(viewedUserId)
  // }

  // return (
  //   <>
  //     <div className="flex h-full min-h-[288px] w-full items-center justify-center bg-[#888888] sm:max-h-[360px]">
  //       <ProfileBanner
  //         viewedUserUsername={params.username}
  //         activityData={activityData}
  //         viewedUserBannerPicture={viewedUserBannerPicture}
  //       />
  //     </div>
  //     <div className="mx-6 mt-6">
  //       <div className="flex max-md:flex-col md:gap-20">
  //         <div className="flex max-md:gap-6 md:max-w-[240px] md:flex-col md:gap-2">
  //           <div className="flex justify-center">
  //             <Avatar className="size-12 md:size-24">
  //               <AvatarImage
  //                 src={user?.user_metadata.profile_picture}
  //                 alt="Profile picture"
  //               />
  //             </Avatar>
  //           </div>
  //           <div className="flex flex-col">
  //             <div className="font-syne text-lg font-semibold">
  //               {params.username}
  //             </div>
  //             <div className="text-sm text-gray-500">{data?.bio}</div>
  //           </div>
  //         </div>

  //         <Tabs defaultValue="grid" className="flex w-full flex-col">
  //           <TabsList className="justify-end bg-transparent">
  //             <TabsTrigger
  //               value="grid"
  //               className="data-[state=active]:bg-muted"
  //             >
  //               <LayoutGrid />
  //             </TabsTrigger>
  //             <TabsTrigger
  //               value="table"
  //               className="data-[state=active]:bg-muted"
  //             >
  //               <TableProperties className="-rotate-180 transform" />
  //             </TabsTrigger>
  //           </TabsList>
  //           <TabsContent value="grid">
  //             <div className="flex flex-col">
  //               <Tabs defaultValue="activity" className="mt-2">
  //                 <TabsList className="w-full">
  //                   <TabsTrigger value="activity" className="w-full">
  //                     Activity
  //                   </TabsTrigger>
  //                   <TabsTrigger value="library" className="w-full">
  //                     Library
  //                   </TabsTrigger>
  //                   <TabsTrigger value="watchlist" className="w-full">
  //                     Watchlist
  //                   </TabsTrigger>
  //                 </TabsList>
  //                 <TabsContent value="activity">
  //                   {renderTabContent(activityData, 'Activity', params)}
  //                 </TabsContent>

  //                 <TabsContent value="library">
  //                   {renderTabContent(activityData, 'Library', params)}
  //                 </TabsContent>

  //                 <TabsContent value="watchlist">
  //                   {renderTabContent(activityData, 'Watchlist', params)}
  //                 </TabsContent>
  //               </Tabs>
  //             </div>
  //           </TabsContent>
  //           <TabsContent value="table" className="mb-6">
  //             <DataTable columns={columns} data={activityData.posters} />
  //           </TabsContent>
  //         </Tabs>
  //       </div>
  //     </div>
  //   </>
  // )
}
