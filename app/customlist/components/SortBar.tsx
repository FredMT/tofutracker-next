import React from 'react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { SortField, SortOption, SortOrder } from '@/app/customlist/types'

interface SortBarProps {
  onSort: (option: SortOption) => void
}

const SortBar: React.FC<SortBarProps> = ({ onSort }) => {
  const handleSortChange = (value: string) => {
    const [field, order] = value.split('-') as [SortField, SortOrder]
    onSort({ field, order })
  }

  return (
    <div className="space-y-2">
      <h4 className="text-muted-foreground">Sort</h4>
      <div className="mb-4 flex items-center space-x-4">
        <Select onValueChange={handleSortChange}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="title-asc">Title (A-Z)</SelectItem>
            <SelectItem value="title-desc">Title (Z-A)</SelectItem>
            <SelectItem value="year-desc">Year (Newest First)</SelectItem>
            <SelectItem value="year-asc">Year (Oldest First)</SelectItem>
            <SelectItem value="genre-asc">Genre (A-Z)</SelectItem>
            <SelectItem value="genre-desc">Genre (Z-A)</SelectItem>
            <SelectItem value="type-asc">Type (A-Z)</SelectItem>
            <SelectItem value="type-desc">Type (Z-A)</SelectItem>
            <SelectItem value="rating-desc">Rating (Highest First)</SelectItem>
            <SelectItem value="rating-asc">Rating (Lowest First)</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}

export default SortBar
