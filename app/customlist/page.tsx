'use client'

import React, { useCallback, useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Edit, PlusCircle } from 'lucide-react'
import { FilterOptions, Movie, SortOption } from '@/app/customlist/types'
import { INITIAL_FILTER_OPTIONS } from '@/app/customlist/constants'
import { MOCK_Data } from '@/app/customlist/data/mockData'
import { filterMovies } from '@/app/customlist/utils/filterMovies'
import MovieTable from '@/app/customlist/components/MovieTable'
import FilterBar from '@/app/customlist/components/FilterBar'
import SortBar from '@/app/customlist/components/SortBar'
import MovieCard from '@/app/customlist/components/MovieCard'
import ListHeader from '@/app/customlist/components/ListHeader'

export default function MovieListApp() {
  const [view, setView] = useState<'card' | 'table'>('card')
  const [filters, setFilters] = useState<FilterOptions>(INITIAL_FILTER_OPTIONS)
  const [searchResults, setSearchResults] = useState<Movie[]>([])
  const [filteredMovies, setFilteredMovies] = useState<Movie[]>([])
  const [sortOption, setSortOption] = useState<SortOption>({
    field: 'title',
    order: 'asc',
  })
  const [isEditMode, setIsEditMode] = useState(false)
  const [movies, setMovies] = useState(MOCK_Data)
  const [listTitle, setListTitle] = useState('My Watchlist')
  const [listDescription, setListDescription] = useState(
    'Keep track of your favorite movies, TV shows, and anime'
  )

  // Add this prop to be filled in later based on authorization
  const canEdit = true // This will be replaced with actual authorization logic

  const handleFilterChange = useCallback(
    (key: keyof FilterOptions, value: string) => {
      setFilters((prevFilters) => ({ ...prevFilters, [key]: value }))
    },
    []
  )

  const handleSearch = useCallback(
    (query: string) => {
      setSearchResults(
        movies.filter((movie) =>
          movie.title.toLowerCase().includes(query.toLowerCase())
        )
      )
    },
    [movies]
  )

  const handleSort = useCallback((option: SortOption) => {
    setSortOption(option)
  }, [])

  const sortMovies = useCallback(
    (moviesToSort: Movie[], option: SortOption): Movie[] => {
      return [...moviesToSort].sort((a, b) => {
        if (a[option.field] < b[option.field])
          return option.order === 'asc' ? -1 : 1
        if (a[option.field] > b[option.field])
          return option.order === 'asc' ? 1 : -1
        return 0
      })
    },
    []
  )

  const toggleEditMode = useCallback(() => {
    setIsEditMode((prev) => !prev)
  }, [])

  const handleRemoveMovie = useCallback((id: number) => {
    setMovies((prevMovies) => prevMovies.filter((movie) => movie.id !== id))
  }, [])

  const handleSaveListDetails = useCallback(
    (newTitle: string, newDescription: string) => {
      setListTitle(newTitle)
      setListDescription(newDescription)
      setIsEditMode(false)
      // Here you would typically call a server action to save the changes
      // For example: saveListDetails(newTitle, newDescription)
    },
    []
  )

  useEffect(() => {
    let result = filterMovies(movies, filters)
    result = sortMovies(result, sortOption)
    setFilteredMovies(result)
  }, [filters, movies, sortOption, sortMovies])

  return (
    <div className="min-h-screen">
      {/* Banner */}
      <div
        className="relative h-[70vh] bg-cover bg-center"
        style={{
          backgroundImage:
            'url(https://image.tmdb.org/t/p/original/yDHYTfA3R0jFYba16jBB1ef8oIt.jpg)',
        }}
      ></div>

      <div className="container mx-auto space-y-6 px-5 py-8 xl:px-40">
        <div className="flex flex-col space-y-2">
          <div className="flex flex-wrap gap-2 sm:justify-between">
            <ListHeader
              title={listTitle}
              description={listDescription}
              isEditing={isEditMode}
              onSave={handleSaveListDetails}
            />
            <div className="flex space-x-2">
              {canEdit && (
                <Button className="w-fit">
                  <PlusCircle className="mr-2" />
                  Add Items
                </Button>
              )}
              {canEdit && (
                <Button onClick={toggleEditMode} className="w-fit">
                  <Edit className="mr-2" />
                  {isEditMode ? 'Done' : 'Edit'}
                </Button>
              )}
            </div>
          </div>
        </div>
        <div className="flex justify-between space-x-2">
          <FilterBar
            filters={filters}
            onFilterChange={handleFilterChange}
            data={MOCK_Data}
          />
        </div>

        <SortBar onSort={handleSort} />

        <Tabs
          value={view}
          onValueChange={(value) => setView(value as 'card' | 'table')}
          className="mb-8"
        >
          <TabsList className="mb-6">
            <TabsTrigger value="card">Card View</TabsTrigger>
            <TabsTrigger value="table">Table View</TabsTrigger>
          </TabsList>
          <TabsContent value="card">
            <div className="grid grid-cols-3 gap-1 sm:gap-2 lg:grid-cols-4 2xl:grid-cols-5">
              {filteredMovies.map((movie) => (
                <MovieCard
                  key={movie.id}
                  movie={movie}
                  isEditMode={isEditMode}
                  onRemove={handleRemoveMovie}
                />
              ))}
            </div>
          </TabsContent>
          <TabsContent value="table">
            <MovieTable
              movies={filteredMovies}
              isEditMode={isEditMode}
              onRemove={handleRemoveMovie}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
