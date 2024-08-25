// import {
//   Dialog,
//   DialogContent,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from '@/components/ui/dialog'
// import ProfileBannerChosenItemDialog from './ProfileBannerChosenItemDialog'
// import { updateBannerFromLibraryItems } from '../settings/components/actions'

export default async function ProfileBanner() {
  //   if (user && user.user_metadata.username === viewedUserUsername) {
  //     if (!user.user_metadata.profile_banner_picture) {
  //   return (
  //     <div className="flex h-full flex-col items-center justify-center">
  //       <Dialog>
  //         <DialogTrigger className="inline-flex h-10 items-center justify-center whitespace-nowrap rounded-md bg-secondary px-4 py-2 text-sm font-medium text-secondary-foreground ring-offset-background transition-colors hover:bg-secondary/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50">
  //           Choose a Banner from an item in your Library
  //         </DialogTrigger>
  //         <DialogContent className="flex flex-col gap-4 max-sm:h-screen max-sm:min-w-[100vw] sm:min-h-[450px] sm:min-w-[90vw]">
  //           <DialogHeader className="mb-6 sm:text-center">
  //             <DialogTitle>Choose from an item in your Library</DialogTitle>
  //           </DialogHeader>
  //           <DialogFooter className="sm:justify-normal">
  //             <Dialog>
  //               <ProfileBannerChosenItemDialog
  //                 activityData={activityData}
  //                 updateBannerFromLibraryItems={updateBannerFromLibraryItems}
  //               />
  //             </Dialog>
  //           </DialogFooter>
  //         </DialogContent>
  //       </Dialog>
  //     </div>
  //   )
  // }
  return (
    <>
      <img
        src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/869ae92e-855f-4458-8e52-e9d04604a682/dcpu91w-4d4efd42-8eb0-4a2a-8d6e-3ac600501bdc.jpg/v1/fill/w_1024,h_434,q_75,strp/spider_man_into_the_spider_verse___banner_by_williansantos26_dcpu91w-fullview.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9NDM0IiwicGF0aCI6IlwvZlwvODY5YWU5MmUtODU1Zi00NDU4LThlNTItZTlkMDQ2MDRhNjgyXC9kY3B1OTF3LTRkNGVmZDQyLThlYjAtNGEyYS04ZDZlLTNhYzYwMDUwMWJkYy5qcGciLCJ3aWR0aCI6Ijw9MTAyNCJ9XV0sImF1ZCI6WyJ1cm46c2VydmljZTppbWFnZS5vcGVyYXRpb25zIl19.cw4t2Y9PBc1NmJJX7SlOg-oTZ2zj4QEqK2EKB0XtDcw"
        alt="Profile banner"
        width={1280}
        height={720}
        className="min-h-[288px] w-full object-cover sm:max-h-[360px]"
      />
      <div className="absolute bottom-0 left-0 right-0 flex justify-center bg-gradient-to-t from-black to-transparent p-12 opacity-35" />
      <div className="absolute left-0 right-0 top-0 flex justify-center bg-gradient-to-b from-black to-transparent p-12 opacity-50" />
    </>
  )
  //   }

  //   return (
  //     <>
  //       <img
  //         src={viewedUserBannerPicture}
  //         alt="Profile banner"
  //         width={1280}
  //         height={720}
  //         className="min-h-[288px] w-full object-cover sm:max-h-[360px]"
  //       />
  //       <div className="absolute bottom-0 left-0 right-0 flex justify-center bg-gradient-to-t from-black to-transparent p-12 opacity-35" />
  //       <div className="absolute left-0 right-0 top-0 flex justify-center bg-gradient-to-b from-black to-transparent p-12 opacity-50" />
  //     </>
  //   )
}
