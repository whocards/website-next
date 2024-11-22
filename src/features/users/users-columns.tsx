import {type ColumnDef} from '@tanstack/react-table'
import {WandSparkles, Shield, User} from 'lucide-react'
import {DataTableColumnHeader} from '~/components/table/data-table-column-header'
import {DataTableRowActions} from '~/components/table/data-table-row-actions'
import {Avatar, AvatarFallback, AvatarImage} from '~/components/ui/avatar'
import {Checkbox} from '~/components/ui/checkbox'
import {MultiSelect} from '~/components/ui/multi-select'
import {UserAvatar} from '~/components/user-avatar'
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
    size: 25,
  },
  {
    accessorKey: 'name',
    header: ({column}) => <DataTableColumnHeader column={column} title='Name' />,
    cell: ({row}) => (
      <div className='flex items-center gap-2'>
        <UserAvatar image={row.original.image} name={row.original.name} />
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
        disabled
        defaultValue={row.original.roles}
        onValueChange={(value) => {
          console.log(value)
        }}
        minimal
      />
    ),
  },
  {
    id: 'actions',
    cell: ({row}) => <DataTableRowActions row={row} />,
    size: 32,
  },
]
