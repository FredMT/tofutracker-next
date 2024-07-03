type Movie = {
  id: number
  adult: boolean
  title: string
  name: never
  logo_path: string
  media_type: 'movie'
  video: boolean
  budget: number
  genres: string[]
  images: Images
  status: string
  videos: Videos
  credits: Credits
  imdb_id: string
  revenue: number
  runtime: number
  similar: Similar
  tagline: string
  homepage: string
  keywords: Keywords
  overview: string
  popularity: number
  vote_count: number
  poster_path: string
  external_ids: ExternalIDs
  release_date: string
  vote_average: number
  backdrop_path: string
  release_dates: ReleaseDates
  origin_country: string[]
  original_title: string
  'watch/providers': {
    results: Record<string, WatchProvider>
  }
  spoken_languages: Language[]

  original_language: string
  production_companies: ProductionCompany[]
  production_countries: ProductionCountry[]
  belongs_to_collection: Collection
}

type Videos = {
  results: VideoDetail[]
}

type VideoDetail = {
  id: string
  key: string
  name: string
  site: string
  size: number
  type: string
  official: boolean
  iso_639_1: string | null
  iso_3166_1: string | null
  published_at: string
}

type Credits = {
  cast: CastMember[]
  crew: CrewMember[]
}

type Similar = {
  page: number
  results: SimilarMovie[]
  total_pages: number
  total_results: number
}

type SimilarMovie = {
  id: number
  adult: boolean
  title: string
  video: boolean
  overview: string
  genre_ids: number[]
  popularity: number
  vote_count: number
  poster_path: string
  release_date: string
  vote_average: number
  backdrop_path: string
  original_title: string
  original_language: string
}

type ReleaseDates = {
  results: ReleaseDateResult[]
}

type ReleaseDateResult = {
  iso_3166_1: string
  release_dates: ReleaseDateDetail[]
}

type ReleaseDateDetail = {
  note: string
  type: number
  iso_639_1: string
  descriptors: any[]
  release_date: string
  certification: string
}

type ProductionCompany = {
  id: number
  name: string
  logo_path: string
  origin_country: string
}

type ProductionCountry = {
  name: string
  iso_3166_1: string
}

type Collection = {
  id: number
  name: string
  poster_path: string
  backdrop_path: string
}
