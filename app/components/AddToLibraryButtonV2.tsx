import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Edit, Edit2, Library, PlusCircle } from 'lucide-react'
import React from 'react'

export default function AddToLibraryButtonV2() {
  // const data = []

  const data = [{"progress": 30, "episodes_watched": 10, "total_episodes": 100, "total_runtime": "1d 10h 2m", "plays": 2}]

  if (data.length < 1) {
  return (
    <div className='flex w-full h-14 '>
        <div className='basis-10/12  h-full w-full flex justify-center items-center'>
          <Button className='p-0 gap-x-2 w-full h-full rounded-sm' >
            <Library  />
            Add To Library</Button>
        </div>
        <div className='basis-2/12  h-full w-full flex items-center justify-center '>
          <Button className='p-0 w-full h-full rounded-sm ring-1 ring-primary-foreground ring-opacity-5' variant="ghost"><Edit /></Button>
        </div>
    </div>
    )
  } else {
    return (
      <div className='flex w-full h-14 '>
          <div className='basis-10/12  h-full w-full flex flex-col justify-center items-center'>
            <Button className='p-0 gap-x-2 w-full h-full rounded-sm justify-start' >
              <Library  className='ml-2'/>
              Add Remaining</Button>
              {data[0].progress > 0 && <Progress className='w-full h-2 rounded-sm' value={data[0].progress} />}
          </div>
          <div className='basis-2/12  h-full w-full flex flex-col ring-1 ring-white ring-opacity-5 '>
            <div className='flex justify-center items-center w-full h-1/2 '>
              <Button className='p-0 w-full h-full rounded-none' variant="ghost"><Edit className='size-4' /></Button>
            </div>
            <div className='flex justify-center items-center w-full h-1/2 '>
              <Button className='p-0 w-full h-full rounded-none' variant="ghost"><PlusCircle className='size-4' /></Button>
            </div>
          </div>
      </div>
    )
  }
}
