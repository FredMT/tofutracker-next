import { SearchInput } from './components/SearchInput'
import SearchResults from './components/SearchResults'

export default function Search({
  searchParams,
}: {
  searchParams?: {
    query?: string
    type?: string
  }
}) {
  const query = searchParams?.query || ''
  const type = searchParams?.type || 'movies'

  return (
    <div className="mx-auto mt-[72px] flex max-w-[1676px] px-5 lg:px-40">
      <div className="w-full px-4 py-5">
        <div className="flex w-full flex-col">
          <SearchInput query={query} />
          <SearchResults query={query} type={type} />
        </div>
      </div>
    </div>
  )
}
