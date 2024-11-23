'use client'

import {type ColumnDef} from '@tanstack/react-table'
import Link from 'next/link'
import {DataTableColumnHeader} from '~/components/table/data-table-column-header'
import {DataTableRowActions} from '~/components/table/data-table-row-actions'
import {Checkbox} from '~/components/ui/checkbox'
import type {Shipping} from '~/types/db'

export const columns: ColumnDef<Shipping>[] = [
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
    header: ({column}) => <DataTableColumnHeader column={column} title='Quantity' />,
    cell: ({row}) => <Link href={`/wc/shippings/${row.original.id}`}>{row.original.quantity}</Link>,
  },
  {
    accessorKey: 'country',
    header: ({column}) => <DataTableColumnHeader column={column} title='Country' />,
    cell: ({row}) => <div>{row.original.country}</div>,
  },
  {
    id: 'actions',
    cell: ({row}) => <DataTableRowActions row={row} />,
    size: 32,
  },
]
