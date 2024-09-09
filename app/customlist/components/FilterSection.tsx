import React from 'react'
import { FilterOptions, SortOption, Movie } from '@/app/customlist/types'
import FilterBar from './FilterBar'
import SortBar from './SortBar'

interface FilterSectionProps {
  filters: FilterOptions
  onFilterChange: (key: keyof FilterOptions, value: string) => void
  onSort: (option: SortOption) => void
  data: Movie[]
}

const FilterSection: React.FC<FilterSectionProps> = ({
  filters,
  onFilterChange,
  onSort,
  data,
}) => {
  return (
    <div className="space-y-4">
      <FilterBar
        filters={filters}
        onFilterChange={onFilterChange}
        data={data}
      />
      <SortBar onSort={onSort} />
    </div>
  )
}

export default FilterSection
