'use client'
'use no memo'

import {useEffect} from 'react'
import type {Column, Table} from '@tanstack/react-table'
import {X} from 'lucide-react'

import {Button} from '~/components/ui/button'
import {Input} from '~/components/ui/input'
import {DataTableViewOptions} from './data-table-view-options'
import {useTableFilteringState} from './data-table-query-state'
import {DataTableFacetedFilter, type DataTableFacetedFilterOptions} from './data-table-faceted-filter'

// import {priorities, statuses} from '../data/data'

interface DataTableToolbarProps<TData, TValue> {
  table: Table<TData>
  searchColumn?: Column<TData, TValue>['id']
  filterColumns?: {columnId: Column<TData, TValue>['id']; options: DataTableFacetedFilterOptions}[]
}

export function DataTableToolbar<TData, TValue>({
  table,
  searchColumn,
  filterColumns,
}: DataTableToolbarProps<TData, TValue>) {
  const [search, setSearch] = useTableFilteringState()
  const isFiltered = table.getState().columnFilters.length > 0

  useEffect(() => {
    if (!searchColumn) return
    table.getColumn(searchColumn)?.setFilterValue(search)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search])

  // TODO move filtering to query state
  return (
    <div className='flex items-center justify-between'>
      <div className='flex flex-1 items-center space-x-2'>
        {searchColumn && table.getColumn(searchColumn) && (
          <Input
            placeholder='Filter by name...'
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            className='h-8 w-[150px] lg:w-[250px]'
          />
        )}
        {filterColumns?.map((filter) => (
          <DataTableFacetedFilter
            key={filter.columnId}
            column={table.getColumn(filter.columnId)}
            options={filter.options}
          />
        ))}
        {/* {table.getColumn('status') && (
          <DataTableFacetedFilter column={table.getColumn('status')} title='Status' options={statuses} />
        )}
        {table.getColumn('priority') && (
          <DataTableFacetedFilter column={table.getColumn('priority')} title='Priority' options={priorities} />
        )} */}
        {isFiltered && (
          <Button
            variant='ghost'
            onClick={() => {
              table.resetColumnFilters()
              void setSearch('')
            }}
            className='h-8 px-2 lg:px-3'
          >
            Reset
            <X />
          </Button>
        )}
      </div>
      <DataTableViewOptions table={table} />
    </div>
  )
}
