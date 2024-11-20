import {type ColumnDef} from '@tanstack/react-table'
import {WandSparkles, Shield, User} from 'lucide-react'
import {DataTableColumnHeader} from '~/components/table/data-table-column-header'
import {Avatar, AvatarFallback, AvatarImage} from '~/components/ui/avatar'
import {Checkbox} from '~/components/ui/checkbox'
import {MultiSelect} from '~/components/ui/multi-select'
import type {AuthUser} from '~/types/db'

const roleSelectOptions = [
  {value: 'owner', label: 'Owner', icon: WandSparkles},
  {value: 'admin', label: 'Admin', icon: Shield},
  {value: 'user', label: 'User', icon: User},
]

export const userColumns: ColumnDef<AuthUser>[] = [
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
    accessorKey: 'name',
    header: ({column}) => <DataTableColumnHeader column={column} title='Name' />,
    cell: ({row}) => (
      <div className='flex items-center gap-2'>
        <Avatar>
          <AvatarImage src={row.original.image ?? ''} alt={row.getValue('name') ?? ''} />
          <AvatarFallback>
            {row.original.name
              ?.split(' ')
              .map((n) => n[0])
              .join('')
              .toUpperCase() ?? 'WC'}
          </AvatarFallback>
        </Avatar>
        <div>{row.original.name}</div>
      </div>
    ),
  },
  {
    accessorKey: 'email',
    header: ({column}) => <DataTableColumnHeader column={column} title='Email' />,
    cell: ({row}) => <div>{row.original.email}</div>,
  },
  {
    accessorKey: 'roles',
    header: ({column}) => <DataTableColumnHeader column={column} title='Roles' />,
    cell: ({row}) => (
      <MultiSelect
        options={roleSelectOptions}
        className='w-[26rem]'
        defaultValue={row.original.roles}
        onValueChange={(value) => {
          console.log(value)
        }}
        minimal
      />
    ),
    size: 500,
  },
]
