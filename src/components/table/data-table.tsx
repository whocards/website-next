'use client'
'use no memo'

import {useState} from 'react'
import {
  type ColumnDef,
  type ColumnFiltersState,
  type PaginationState,
  type SortingState,
  type Updater,
  type VisibilityState,
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table'

import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from '~/components/ui/table'

import {DataTablePagination} from './data-table-pagination'
import {cn} from '~/lib/utils'
import {usePathname, useRouter} from 'next/navigation'
import {useTablePageSizeState, useTablePageState, useTableSortingState} from './data-table-query-state'
// import {DataTableToolbar} from './data-table-toolbar'

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  rowLink?: boolean
}

export function DataTable<TData, TValue>({columns, data, rowLink}: DataTableProps<TData, TValue>) {
  const [rowSelection, setRowSelection] = useState({})
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const pathname = usePathname()
  const router = useRouter()

  const [page, setPage] = useTablePageState()
  const [pageSize, setPageSize] = useTablePageSizeState()
  const [sorting, setSorting] = useTableSortingState()

  const pagination = {
    pageIndex: page - 1,
    pageSize,
  }

  function onPaginationChange(updaterOrValue: Updater<PaginationState>) {
    const newPagination = typeof updaterOrValue === 'function' ? updaterOrValue(pagination) : updaterOrValue
    void setPage(newPagination.pageIndex + 1)
    void setPageSize(newPagination.pageSize)
  }

  function onSortingChange(updaterOrValue: Updater<SortingState>) {
    const newSorting = typeof updaterOrValue === 'function' ? updaterOrValue(sorting ?? []) : updaterOrValue
    void setSorting(newSorting)
  }

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting: sorting ?? undefined,
      columnVisibility,
      rowSelection,
      columnFilters,
      pagination,
    },
    enableMultiSort: false,
    enableRowSelection: true,
    onPaginationChange,
    onSortingChange,
    onRowSelectionChange: setRowSelection,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  })

  const onRowClick = (id: string | number) => {
    if (!rowLink || !id) return
    router.push(`${pathname}/${id}`)
  }

  return (
    <div className='space-y-4'>
      {/* <DataTableToolbar table={table} /> */}
      <div className='rounded-md border'>
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} colSpan={header.colSpan}>
                      {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
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
                  onClick={() => onRowClick(row.getValue('id'))}
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      style={{
                        width:
                          cell.column.columnDef.size === Number.MAX_SAFE_INTEGER ? '100%' : cell.column.columnDef.size,
                      }}
                      className={cn(rowLink && cell.id.split('_')[1] !== 'actions' && 'cursor-pointer')}
                      onClick={(e) => {
                        if (rowLink && cell.id.split('_')[1] === 'actions') e.stopPropagation()
                      }}
                    >
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className='h-24 text-center'>
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <DataTablePagination table={table} />
    </div>
  )
}
