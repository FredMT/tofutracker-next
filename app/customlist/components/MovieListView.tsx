import React, { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Movie } from '@/app/customlist/types'
import MovieCard from './MovieCard'
import MovieTable from './MovieTable'

interface MovieListViewProps {
  movies: Movie[]
  onRemove: (id: number) => void
}

const MovieListView: React.FC<MovieListViewProps> = ({ movies, onRemove }) => {
  const [view, setView] = useState<'card' | 'table'>('card')

  return (
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
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} onRemove={onRemove} />
          ))}
        </div>
      </TabsContent>
      <TabsContent value="table">
        <MovieTable movies={movies} onRemove={onRemove} />
      </TabsContent>
    </Tabs>
  )
}

export default MovieListView
