import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { use } from 'react'
import SearchResultCard from './SearchResultCard'
import SearchResultsTabs from './SearchResultsTabs'

async function fetchSearchResults(query: string) {
  if (!query) return null

  const response = await fetch(
    `${process.env.BACKEND_BASE_URL}search?query=${encodeURIComponent(query)}&page=1`
  )
  if (!response.ok) {
    throw new Error('Failed to fetch search results')
  }
  return response.json()
}

export default function SearchResults({
  query,
  type,
}: {
  query: string
  type: string
}) {
  const results = use(fetchSearchResults(query))

  if (!query) {
    return null
  }

  return (
    <div>
      <div className="mt-4 flex flex-col space-y-1">
        <div className="body">Search results for</div>
        <div className="large">{`"${query.trim()}"`}</div>
        <Tabs defaultValue={type}>
          <SearchResultsTabs results={results} />
          {['movies', 'tv', 'anime'].map((tab) => (
            <TabsContent value={tab} key={tab}>
              <div className="mt-4 flex flex-col space-y-1">
                <div className="mt-4 flex flex-col space-y-6">
                  {results?.[tab]?.map((item: any) => (
                    <SearchResultCard data={item} key={item.id} />
                  ))}
                </div>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  )
}