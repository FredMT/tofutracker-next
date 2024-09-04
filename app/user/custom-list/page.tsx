'use client'
import React, { useState, useMemo } from 'react'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  SortingState,
  getSortedRowModel,
} from '@tanstack/react-table'
import { Grid, List, SortAsc, SortDesc } from 'lucide-react'

interface Movie {
  id: number
  title: string
  year: number
  rating: number
  score: number
  imageUrl: string
  genres: string[]
  runtime: number
  revenue: number
}

const movies: Movie[] = [
  {
    id: 1,
    title: 'Iron Man',
    year: 2008,
    rating: 7.9,
    score: 9.2,
    imageUrl: '/placeholder.svg?height=400&width=300',
    genres: ['Action', 'Adventure', 'Sci-Fi'],
    runtime: 126,
    revenue: 585.2,
  },
  {
    id: 2,
    title: 'Iron Man 2',
    year: 2010,
    rating: 7.0,
    score: 9.1,
    imageUrl: '/placeholder.svg?height=400&width=300',
    genres: ['Action', 'Adventure', 'Sci-Fi'],
    runtime: 124,
    revenue: 623.9,
  },
  {
    id: 3,
    title: 'Iron Man 3',
    year: 2013,
    rating: 7.1,
    score: 9,
    imageUrl: '/placeholder.svg?height=400&width=300',
    genres: ['Action', 'Adventure', 'Sci-Fi'],
    runtime: 130,
    revenue: 1214.8,
  },
  {
    id: 4,
    title: 'Captain America: The First Avenger',
    year: 2011,
    rating: 6.9,
    score: 8,
    imageUrl: '/placeholder.svg?height=400&width=300',
    genres: ['Action', 'Adventure', 'Sci-Fi', 'Thriller'],
    runtime: 124,
    revenue: 370.6,
  },
  {
    id: 5,
    title: 'Captain America: The Winter Soldier',
    year: 2014,
    rating: 7.7,
    score: 9.3,
    imageUrl: '/placeholder.svg?height=400&width=300',
    genres: ['Action', 'Adventure', 'Sci-Fi'],
    runtime: 136,
    revenue: 714.4,
  },
  {
    id: 6,
    title: 'Captain America: Civil War',
    year: 2016,
    rating: 7.8,
    score: 9.3,
    imageUrl: '/placeholder.svg?height=400&width=300',
    genres: ['Action', 'Adventure', 'Sci-Fi'],
    runtime: 147,
    revenue: 1153.3,
  },
]

const columns: ColumnDef<Movie>[] = [
  {
    accessorKey: 'title',
    header: 'Title',
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue('title')}</div>
    ),
  },
  {
    accessorKey: 'year',
    header: 'Year',
    cell: ({ row }) => <div>{row.getValue('year')}</div>,
  },
  {
    accessorKey: 'rating',
    header: 'Rating',
    cell: ({ row }) => <div>{row.getValue('rating')}</div>,
  },
  {
    accessorKey: 'score',
    header: 'Score',
    cell: ({ row }) => <div>{row.getValue('score')}</div>,
  },
  {
    accessorKey: 'genres',
    header: 'Genres',
    cell: ({ row }) => (
      <div>{(row.getValue('genres') as string[]).join(', ')}</div>
    ),
  },
  {
    accessorKey: 'runtime',
    header: 'Runtime (min)',
    cell: ({ row }) => <div>{row.getValue('runtime')}</div>,
  },
  {
    accessorKey: 'revenue',
    header: 'Revenue (M$)',
    cell: ({ row }) => <div>{row.getValue('revenue')}</div>,
  },
]

export default function MovieList() {
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid')
  const [sorting, setSorting] = useState<SortingState>([])
  const [filters, setFilters] = useState({
    title: '',
    genre: '',
    minRating: '',
    minRevenue: '',
  })

  const handleFilterChange = (key: string, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }))
  }

  const filteredMovies = useMemo(() => {
    return movies.filter(
      (movie) =>
        movie.title.toLowerCase().includes(filters.title.toLowerCase()) &&
        (filters.genre === 'all' || movie.genres.includes(filters.genre)) &&
        (filters.minRating === '' ||
          movie.rating >= parseFloat(filters.minRating)) &&
        (filters.minRevenue === '' ||
          movie.revenue >= parseFloat(filters.minRevenue))
    )
  }, [filters])

  const table = useReactTable({
    data: filteredMovies,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
    },
  })

  return (
    <div className="container mx-auto mt-[72px] p-4">
      <div className="mb-6 flex flex-col items-center justify-between md:flex-row">
        <h1 className="mb-4 text-3xl font-bold md:mb-0">
          Marvel Cinematic Universe
        </h1>
        <div className="flex items-center space-x-4">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setViewMode(viewMode === 'grid' ? 'table' : 'grid')}
          >
            {viewMode === 'grid' ? (
              <List className="h-4 w-4" />
            ) : (
              <Grid className="h-4 w-4" />
            )}
          </Button>
        </div>
      </div>

      <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <Label htmlFor="title-filter">Title</Label>
          <Input
            id="title-filter"
            placeholder="Filter by title..."
            value={filters.title}
            onChange={(e) => handleFilterChange('title', e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="genre-filter">Genre</Label>
          <Select
            value={filters.genre}
            onValueChange={(value) => handleFilterChange('genre', value)}
          >
            <SelectTrigger id="genre-filter">
              <SelectValue placeholder="Select genre" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Genres</SelectItem>
              <SelectItem value="Action">Action</SelectItem>
              <SelectItem value="Adventure">Adventure</SelectItem>
              <SelectItem value="Sci-Fi">Sci-Fi</SelectItem>
              <SelectItem value="Thriller">Thriller</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="rating-filter">Min Rating</Label>
          <Input
            id="rating-filter"
            type="number"
            placeholder="Min rating..."
            value={filters.minRating}
            onChange={(e) => handleFilterChange('minRating', e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="revenue-filter">Min Revenue (M$)</Label>
          <Input
            id="revenue-filter"
            type="number"
            placeholder="Min revenue..."
            value={filters.minRevenue}
            onChange={(e) => handleFilterChange('minRevenue', e.target.value)}
          />
        </div>
      </div>

      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
          {filteredMovies.map((movie) => (
            <Card key={movie.id} className="overflow-hidden">
              <img
                src={movie.imageUrl}
                alt={movie.title}
                className="h-48 w-full object-cover"
              />
              <CardContent className="p-4">
                <h2 className="truncate text-lg font-semibold">
                  {movie.title}
                </h2>
                <p className="text-sm text-gray-500">{movie.year}</p>
                <p className="text-sm text-gray-500">
                  {movie.genres.join(', ')}
                </p>
              </CardContent>
              <CardFooter className="flex justify-between bg-gray-100 p-4">
                <span className="text-sm font-medium">
                  Rating: {movie.rating}
                </span>
                <span className="text-sm font-medium text-green-600">
                  Score: {movie.score}
                </span>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id}>
                        {header.isPlaceholder ? null : (
                          <div
                            {...{
                              className: header.column.getCanSort()
                                ? 'cursor-pointer select-none'
                                : '',
                              onClick: header.column.getToggleSortingHandler(),
                            }}
                          >
                            {flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                            {{
                              asc: <SortAsc className="ml-2 inline h-4 w-4" />,
                              desc: (
                                <SortDesc className="ml-2 inline h-4 w-4" />
                              ),
                            }[header.column.getIsSorted() as string] ?? null}
                          </div>
                        )}
                      </TableHead>
                    )
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && 'selected'}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  )
}
