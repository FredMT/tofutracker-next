export type Episode = {
  episode_id: number
  episode_number: number
  name: string
}

export type Season = {
  show_id: number
  id: number
  name: string
  title?: string
  overview: string
  poster_path: string
  season_number: number
  rating: number
  air_date: Date
  episode_count: number
  episodes: Episode[]
}
