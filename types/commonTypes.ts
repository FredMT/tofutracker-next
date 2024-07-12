import { User } from '@supabase/supabase-js'

export type UserOrNull = User | null

type Genre = {
  id: number
  name: string
}

type Person = {
  id: number
  name: string
  adult: boolean
  gender: number
  profile_path: string
  popularity: number
  original_name: string
  known_for_department: string
}

type Images = {
  logos: ImageDetail[]
  posters: ImageDetail[]
  backdrops: ImageDetail[]
}

type ImageDetail = {
  width: number
  height: number
  file_path: string
  iso_639_1: string | null
  vote_count: number
  aspect_ratio: number
  vote_average: number
}

type CastMember = Person & {
  order: number
  cast_id: number
  character: string
  credit_id: string
}

type CrewMember = Person & {
  job: string
  credit_id: string
  department: string
}

type Keywords = {
  keywords: Keyword[]
}

type Keyword = {
  id: number
  name: string
}

type ExternalIDs = {
  imdb_id: string
  twitter_id: string
  facebook_id: string
  wikidata_id: string
  instagram_id: string
}

type Provider = {
  logo_path: string
  provider_id: number
  provider_name: string
  display_priority: number
}

type WatchProvider = {
  link: string
  flatrate?: Provider[]
  buy?: Provider[]
  rent?: Provider[]
}

type Language = {
  name: string
  iso_639_1: string
  english_name: string
}

export type TrendingData = {
  movies: Movie[]
  tvShows: TVShow[]
  anime: Anime[]
}
