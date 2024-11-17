'use client'

import type {ColumnDef} from '@tanstack/react-table'

import {Badge} from '~/components/ui/badge'
import {Checkbox} from '~/components/ui/checkbox'

import {DataTableColumnHeader} from '~/components/table/data-table-column-header'
import {DataTableRowActions} from '~/components/table/data-table-row-actions'
import type {PurchaseWithUserAndShipping} from '~/types/purchases'

export const purchaseColumns: ColumnDef<PurchaseWithUserAndShipping>[] = [
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
  },
  {
    accessorKey: 'id',
    header: ({column}) => <DataTableColumnHeader column={column} title='Purchase' />,
    cell: ({row}) => <div className='w-24'>WC-{row.original.id.slice(-4)}</div>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'category',
    header: ({column}) => <DataTableColumnHeader column={column} title='Category' />,
    cell: ({row}) => {
      return <Badge variant='secondary'>{row.getValue('category')}</Badge>
    },
  },
  {
    accessorKey: 'shipping',
    header: ({column}) => <DataTableColumnHeader column={column} title='Quantity' />,
    cell: ({row}) => {
      return <div>{row.original.shipping.quantity}</div>
    },
  },
  //   filterFn: (row, id, value) => {
  //     return value.includes(row.getValue(id))
  //   },
  // },
  // {
  //   accessorKey: 'priority',
  //   header: ({column}) => <DataTableColumnHeader column={column} title='Priority' />,
  //   cell: ({row}) => {
  //     const priority = priorities.find((priority) => priority.value === row.getValue('priority'))

  //     if (!priority) {
  //       return null
  //     }

  //     return (
  //       <div className='flex items-center'>
  //         {priority.icon && <priority.icon className='mr-2 h-4 w-4 text-muted-foreground' />}
  //         <span>{priority.label}</span>
  //       </div>
  //     )
  //   },
  //   filterFn: (row, id, value) => {
  //     return value.includes(row.getValue(id))
  //   },
  // },
  {
    id: 'actions',
    cell: ({row}) => <DataTableRowActions row={row} />,
  },
]
