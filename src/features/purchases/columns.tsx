'use client'

import type {ColumnDef} from '@tanstack/react-table'

import {Badge} from '~/components/ui/badge'
import {Checkbox} from '~/components/ui/checkbox'

import {DataTableColumnHeader} from '~/components/table/data-table-column-header'
import {DataTableRowActions} from '~/components/table/data-table-row-actions'
import type {PurchaseWithUserAndShipping} from '~/types/purchases'
import {Separator} from '~/components/ui/separator'

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
    accessorKey: 'user.name',
    header: ({column}) => <DataTableColumnHeader column={column} title='Name' />,
    size: Number.MAX_SAFE_INTEGER,
    cell: ({row}) => {
      return (
        <div className='flex w-full items-center gap-2'>
          <div className='text-sm text-muted-foreground'>{row.original.user.name}</div>
          {row.original.shipping.company && <Badge variant='secondary'>{row.original.shipping.company}</Badge>}
        </div>
      )
    },
  },
  {
    accessorKey: 'shipping.quantity',
    header: ({column}) => <DataTableColumnHeader column={column} title='Quantity' />,
    cell: ({row}) => {
      return (
        <div className='flex items-center gap-2'>
          <div>{row.original.shipping.quantity}</div>
          {/* <Separator orientation='vertical' className='h-4' />
          <div>{row.original.category}</div> */}
        </div>
      )
    },
  },
  {
    accessorKey: 'shipping.country',
    header: ({column}) => <DataTableColumnHeader column={column} title='Country' />,
    cell: ({row}) => <div>{row.original.shipping.country}</div>,
  },
  {
    accessorKey: 'shipping.city',
    header: ({column}) => <DataTableColumnHeader column={column} title='City' />,
    cell: ({row}) => <div>{row.original.shipping.city}</div>,
  },
  {
    accessorKey: 'price',
    header: ({column}) => <DataTableColumnHeader column={column} title='Price' />,
    cell: ({row}) => {
      const price = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'EUR',
      })
      return <div>{price.format(row.original.price / 100)}</div>
    },
  },
  {
    accessorKey: 'netPrice',
    header: ({column}) => <DataTableColumnHeader className='max-w-min' column={column} title='Net Price' />,
    cell: ({row}) => {
      const price = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'EUR',
      })
      return <div className='max-w-min'>{price.format(row.original.netPrice / 100)}</div>
    },
  },
  {
    accessorKey: 'date',
    header: ({column}) => <DataTableColumnHeader column={column} title='Date' />,
    cell: ({row}) => <div>{row.original.date.toLocaleDateString()}</div>,
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
