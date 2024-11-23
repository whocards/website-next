'use client'

import {type ColumnDef} from '@tanstack/react-table'
import {DataTableColumnHeader} from '~/components/table/data-table-column-header'
import {DataTableRowActions} from '~/components/table/data-table-row-actions'
import {Checkbox} from '~/components/ui/checkbox'
import type {Card} from '~/types/db'

export const cardColumns: ColumnDef<Card>[] = [
  {
    id: 'select',
    header: ({table}) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && 'indeterminate')}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label='Select all'
        className='translate-y-[2px]'
      />
    ),
    cell: ({row}) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label='Select row'
        className='translate-y-[2px]'
      />
    ),
    enableSorting: false,
    enableHiding: false,
    size: 25,
  },
  {
    accessorKey: 'quantity',
    header: ({column}) => <DataTableColumnHeader column={column} title='Cards' />,
    cell: ({row}) => <div>{row.original.quantity * (row.original.isBox ? 12 : 1)}</div>,
  },
  {
    accessorKey: 'location',
    header: ({column}) => <DataTableColumnHeader column={column} title='Location' />,
    cell: ({row}) => <div>{row.original.location}</div>,
    size: Number.MAX_SAFE_INTEGER,
  },
  {
    id: 'actions',
    cell: ({row}) => <DataTableRowActions row={row} />,
    size: 32,
  },
]
