import React, { useMemo } from 'react'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { FilterOptions, Movie } from '@/app/customlist/types'

interface FilterBarProps {
  filters: FilterOptions
  onFilterChange: (key: keyof FilterOptions, value: string) => void
  data: Movie[]
}

const FilterBar: React.FC<FilterBarProps> = ({
  filters,
  onFilterChange,
  data,
}) => {
  const uniqueOptions = useMemo(() => {
    const years = Array.from(new Set(data.map((movie) => movie.year))).sort(
      (a, b) => b - a
    )
    const ratings = Array.from(
      new Set(data.map((movie) => Math.floor(movie.rating)))
    ).sort((a, b) => b - a)
    const genres = Array.from(new Set(data.map((movie) => movie.genre)))
    const types = Array.from(new Set(data.map((movie) => movie.type)))

    return { years, ratings, genres, types }
  }, [data])

  return (
    <div className="space-y-2">
      <h4 className="text-muted-foreground">Filter</h4>
      <div className="flex flex-wrap gap-4">
        {' '}
        <Input
          type="text"
          placeholder="Filter by title"
          className="w-full sm:w-auto"
          value={filters.title}
          onChange={(e) => onFilterChange('title', e.target.value)}
        />
        <Select
          value={filters.year}
          onValueChange={(value) => onFilterChange('year', value)}
        >
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Year" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="allyears">All Years</SelectItem>
            {uniqueOptions.years.map((year: any) => (
              <SelectItem key={year} value={year.toString()}>
                {year}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select
          value={filters.rating}
          onValueChange={(value) => onFilterChange('rating', value)}
        >
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Rating" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="allratings">All Ratings</SelectItem>
            {uniqueOptions.ratings.map((rating: any) => (
              <SelectItem key={rating} value={`${rating}+`}>
                {rating}+
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select
          value={filters.genre}
          onValueChange={(value) => onFilterChange('genre', value)}
        >
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Genre" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="allgenres">All Genres</SelectItem>
            {uniqueOptions.genres.map((genre) => (
              <SelectItem key={genre} value={genre}>
                {genre}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select
          value={filters.type}
          onValueChange={(value) => onFilterChange('type', value)}
        >
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="alltypes">All Types</SelectItem>
            {uniqueOptions.types.map((type: any) => (
              <SelectItem key={type} value={type}>
                {type}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}

export default FilterBar
