type TVShow = {
  id: number
  name: string
  title: never
  media_type: 'tv'

  type: string
  adult: boolean
  genres: Genre[]
  images: {
    logos: Image[]
    posters: Image[]
    backdrops: Image[]
  }
  status: string
  videos: {
    results: Video[]
  }
  credits: {
    cast: CastMember[]
    crew: CrewMember[]
  }
  seasons: Season[]
  tagline: string
  homepage: string
  keywords: {
    results: Keyword[]
  }
  networks: Network[]
  overview: string
  languages: string[]
  created_by: Person[]
  popularity: number
  vote_count: number
  poster_path: string
  external_ids: {
    imdb_id: string
    tvdb_id: number
    tvrage_id: number
    twitter_id: string
    facebook_id: string
    freebase_id: string
    wikidata_id: string
    freebase_mid: string
    instagram_id: string
  }
  vote_average: number
  backdrop_path: string
  in_production: boolean
  last_air_date: string
  original_name: string
  first_air_date: string
  origin_country: string[]
  content_ratings: {
    results: ContentRating[]
  }
  recommendations: {
    page: number
    results: Recommendation[]
    total_pages: number
    total_results: number
  }
  'watch/providers': {
    results: Record<string, WatchProvider>
  }
  episode_run_time: number[]
  spoken_languages: Language[]
  aggregate_credits: {
    cast: CastMember[]
    crew: CrewMember[]
  }
  number_of_seasons: number
  original_language: string
  number_of_episodes: number
  last_episode_to_air: EpisodeDetail
  next_episode_to_air: EpisodeDetail
  production_companies: Network[]
  production_countries: {
    name: string
    iso_3166_1: string
  }[]
}

type Image = {
  width: number
  height: number
  file_path: string
  iso_639_1: string | null
  vote_count: number
  aspect_ratio: number
  vote_average: number
}

type Video = {
  id: string
  key: string
  name: string
  site: string
  size: number
  type: string
  official: boolean
  iso_639_1: string
  iso_3166_1: string
  published_at: string
}

type Season = {
  id: number
  name: string
  air_date: string
  overview: string
  poster_path: string
  vote_average: number
  episode_count: number
  season_number: number
}

type Network = {
  id: number
  name: string
  logo_path: string
  origin_country: string
}

type ContentRating = {
  rating: string
  iso_3166_1: string
  descriptors: string[]
}

type Recommendation = {
  id: number
  name: string
  adult: boolean
  overview: string
  genre_ids: number[]
  media_type: string
  popularity: number
  vote_count: number
  poster_path: string
  vote_average: number
  backdrop_path: string
  original_name: string
  first_air_date: string
  origin_country: string[]
  original_language: string
}

type EpisodeDetail = {
  id: number
  name: string
  runtime: number | null
  show_id: number
  air_date: string
  overview: string
  still_path: string
  vote_count: number
  episode_type: string
  vote_average: number
  season_number: number
  episode_number: number
  production_code: string
}
