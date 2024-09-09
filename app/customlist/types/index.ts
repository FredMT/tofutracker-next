export interface Movie {
  id: number
  title: string
  year: number
  rating: number
  genre: string
  type: string
  poster: string
  description: string
}

export interface FilterOptions {
  title: string
  year: string
  rating: string
  genre: string
  type: string
}

export type SortField = 'title' | 'year' | 'genre' | 'type' | 'rating'
export type SortOrder = 'asc' | 'desc'

export interface SortOption {
  field: SortField
  order: SortOrder
}
