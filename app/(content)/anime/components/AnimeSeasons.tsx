import { Separator } from '@/components/ui/separator'
import AnimeCard from './AnimeCard'

interface AnimeInfo {
  id: number
  poster: string
  title: string
  season: string
  rating: number | null
}

interface RelatedAnimeData {
  main: AnimeInfo[]
  specials: AnimeInfo[]
}

export default function AnimeSeasons({
  data,
  showId,
}: {
  data: RelatedAnimeData
  showId: string
}) {
  return (
    <div className="mt-6 space-y-6">
      <div className="flex flex-wrap gap-x-3">
        {data.main.map((show) => (
          <AnimeCard key={show.id} show={show} showId={showId} />
        ))}
      </div>

      {data.specials.length > 0 && (
        <div>
          <h2 className="mb-3 text-lg font-semibold">Specials</h2>
          <div className="flex flex-wrap gap-x-3">
            {data.specials.map((show) => (
              <div key={show.id}>
                <AnimeCard show={show} showId={showId} />
              </div>
            ))}
          </div>
          <Separator className="my-4" />
        </div>
      )}
    </div>
  )
}
