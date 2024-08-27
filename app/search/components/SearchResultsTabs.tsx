'use client'

import { TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useRouter } from '@/hooks/useRouter'
import { usePathname, useSearchParams } from 'next/navigation'

export default function SearchResultsTabs({ results }: { results: any }) {
  const router = useRouter()
  const queryParams = useSearchParams()
  const pathName = usePathname()
  return (
    <TabsList className="w-full justify-evenly bg-transparent p-0 md:h-12">
      <TabsTrigger
        value="movies"
        className="basis-1/3 ring-purple-500 data-[state=active]:ring-1"
        onClick={() =>
          router.push(
            `${pathName}?query=${queryParams.get('query')}&type=movies`
          )
        }
      >
        Movies ({results?.movies?.length || 0})
      </TabsTrigger>
      <TabsTrigger
        value="tv"
        className="basis-1/3 ring-purple-500 data-[state=active]:ring-1"
        onClick={() =>
          router.push(`${pathName}?query=${queryParams.get('query')}&type=tv`)
        }
      >
        TV ({results?.tv?.length || 0})
      </TabsTrigger>
      <TabsTrigger
        value="anime"
        className="basis-1/3 ring-purple-500 data-[state=active]:ring-1"
        onClick={() =>
          router.push(
            `${pathName}?query=${queryParams.get('query')}&type=anime`
          )
        }
      >
        Anime ({results?.anime?.length || 0})
      </TabsTrigger>
    </TabsList>
  )
}
