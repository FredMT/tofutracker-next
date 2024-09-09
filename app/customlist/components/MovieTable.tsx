import React from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { Movie } from '@/app/customlist/types'

interface MovieTableProps {
  movies: Movie[]
  isEditMode: boolean
  onRemove: (id: number) => void
}

const MovieTable: React.FC<MovieTableProps> = ({
  movies,
  isEditMode,
  onRemove,
}) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Poster</TableHead>
          <TableHead>Title</TableHead>
          <TableHead>Year</TableHead>
          <TableHead>Rating</TableHead>
          <TableHead>Genre</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>Description</TableHead>
          {isEditMode && <TableHead>Action</TableHead>}
        </TableRow>
      </TableHeader>
      <TableBody>
        {movies.map((movie) => (
          <TableRow key={movie.id}>
            <TableCell>
              <img
                src={movie.poster}
                alt={movie.title}
                className="h-16 w-12 object-cover"
              />
            </TableCell>
            <TableCell>{movie.title}</TableCell>
            <TableCell>{movie.year}</TableCell>
            <TableCell>{movie.rating}</TableCell>
            <TableCell>{movie.genre}</TableCell>
            <TableCell>{movie.type}</TableCell>
            <TableCell>{movie.description}</TableCell>
            {isEditMode && (
              <TableCell>
                <Button size="sm" onClick={() => onRemove(movie.id)}>
                  Remove
                </Button>
              </TableCell>
            )}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

export default MovieTable
