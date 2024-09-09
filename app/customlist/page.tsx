'use client'

import React, { useState, useCallback, useMemo } from 'react'
import { EditModeProvider } from '@/app/customlist/contexts/EditModeContext'
import ListHeader from '@/app/customlist/components/ListHeader'
import ActionButtons from '@/app/customlist/components/ActionButtons'
import FilterSection from '@/app/customlist/components/FilterSection'
import MovieListView from '@/app/customlist/components/MovieListView'
import { MOCK_Data } from '@/app/customlist/data/mockData'
import { filterMovies } from '@/app/customlist/utils/filterMovies'
import { INITIAL_FILTER_OPTIONS } from '@/app/customlist/constants'
import { FilterOptions, Movie, SortOption } from '@/app/customlist/types'
import BannerComponent from '@/app/customlist/components/Banner'
import Banner from '@/app/customlist/components/Banner'

export default function MovieListApp() {
  const [movies, setMovies] = useState(MOCK_Data)
  const [filters, setFilters] = useState<FilterOptions>(INITIAL_FILTER_OPTIONS)
  const [sortOption, setSortOption] = useState<SortOption>({
    field: 'title',
    order: 'asc',
  })
  const [bannerUrl, setBannerUrl] = useState(
    'https://image.tmdb.org/t/p/original/yDHYTfA3R0jFYba16jBB1ef8oIt.jpg'
  )

  const handleFilterChange = useCallback(
    (key: keyof FilterOptions, value: string) => {
      setFilters((prevFilters) => ({ ...prevFilters, [key]: value }))
    },
    []
  )

  const handleSort = useCallback((option: SortOption) => {
    setSortOption(option)
  }, [])

  const handleRemoveMovie = useCallback((id: number) => {
    setMovies((prevMovies) => prevMovies.filter((movie) => movie.id !== id))
  }, [])

  const handleChooseBanner = useCallback(() => {
    // Implement logic to choose banner from item
    console.log('Choose banner from item')
  }, [])

  const handleUploadBanner = useCallback(() => {
    // Implement logic to upload banner
    console.log('Upload banner')
  }, [])

  const filteredAndSortedMovies = useMemo(() => {
    let result = filterMovies(movies, filters)
    result.sort((a, b) => {
      if (a[sortOption.field] < b[sortOption.field])
        return sortOption.order === 'asc' ? -1 : 1
      if (a[sortOption.field] > b[sortOption.field])
        return sortOption.order === 'asc' ? 1 : -1
      return 0
    })
    return result
  }, [movies, filters, sortOption])

  return (
    <EditModeProvider>
      <div className="min-h-screen">
        <Banner
          bannerUrl={bannerUrl}
          onChooseBanner={handleChooseBanner}
          onUploadBanner={handleUploadBanner}
        />

        <div className="container mx-auto space-y-6 px-5 py-8 xl:px-40">
          <div className="flex flex-col space-y-2">
            <div className="flex flex-wrap gap-2 sm:justify-between">
              <ListHeader />
              <ActionButtons />
            </div>
          </div>
          <FilterSection
            filters={filters}
            onFilterChange={handleFilterChange}
            onSort={handleSort}
            data={movies}
          />
          <MovieListView
            movies={filteredAndSortedMovies}
            onRemove={handleRemoveMovie}
          />
        </div>
      </div>
    </EditModeProvider>
  )
}
