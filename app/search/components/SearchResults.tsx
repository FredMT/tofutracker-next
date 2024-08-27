import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { use } from 'react'

async function fetchSearchResults(query: string) {
  if (!query) return null

  const response = await fetch(
    `http://localhost:3030/api/search?query=${encodeURIComponent(query)}&page=1`
  )
  if (!response.ok) {
    throw new Error('Failed to fetch search results')
  }
  return response.json()
}

export default function SearchResults({ query }: { query: string }) {
  const results = use(fetchSearchResults(query))

  if (!query) {
    return null
  }

  const { movies, tv, anime } = results || {}

  return (
    <div>
      <div className="mt-4 flex flex-col space-y-1">
        <div className="body">Search results for</div>
        <div className="large">{`"${query.trim()}"`}</div>
        <Tabs defaultValue="movies">
          <TabsList className="w-full justify-evenly bg-transparent p-0 md:h-12">
            <TabsTrigger
              value="movies"
              className="basis-1/3 ring-purple-500 data-[state=active]:ring-1"
            >
              Movies ({results?.movies?.length || 0})
            </TabsTrigger>
            <TabsTrigger
              value="tv"
              className="basis-1/3 ring-purple-500 data-[state=active]:ring-1"
            >
              TV ({results?.tv?.length || 0})
            </TabsTrigger>
            <TabsTrigger
              value="anime"
              className="basis-1/3 ring-purple-500 data-[state=active]:ring-1"
            >
              Anime ({results?.anime?.length || 0})
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
    </div>
  )
}
