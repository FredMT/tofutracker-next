import { FilterOptions, Movie } from '@/app/customlist/types'

export const filterMovies = (
  movies: Movie[],
  filters: FilterOptions
): Movie[] => {
  return movies.filter((movie) => {
    const ratingFilter = parseFloat(filters.rating.replace('+', '')) || 0
    return (
      movie.title.toLowerCase().includes(filters.title.toLowerCase()) &&
      (filters.year === 'allyears' || movie.year.toString() === filters.year) &&
      (filters.rating === 'allratings' || movie.rating >= ratingFilter) &&
      (filters.genre === 'allgenres' || movie.genre === filters.genre) &&
      (filters.type === 'alltypes' || movie.type === filters.type)
    )
  })
}
