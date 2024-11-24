'use client'

import {type Row} from '@tanstack/react-table'
import {MoreHorizontal} from 'lucide-react'
import {useRouter} from 'next/navigation'

import {Button} from '~/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  // DropdownMenuRadioGroup,
  // DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '~/components/ui/dropdown-menu'
import {useSessionUser} from '~/hooks/use-session-user'
import {hasPermission} from '~/lib/permissions'
import {api} from '~/trpc/react'
import type {AuthUser} from '~/types/db'

type Props = {
  row: Row<AuthUser>
}

export const UserRowActions = ({row}: Props) => {
  const user = useSessionUser()
  const approveAdminAccessMutation = api.users.approveAdminAccess.useMutation()
  const utils = api.useUtils()

  const approveAdminAccess = async () => {
    await approveAdminAccessMutation.mutateAsync(row.original.id)
    await utils.users.getAll.refetch()
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='ghost' className='flex h-8 w-8 p-0 data-[state=open]:bg-muted'>
          <MoreHorizontal />
          <span className='sr-only'>Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end' className='w-[160px]'>
        {row.original.requestedAdminAccess && hasPermission(user, 'users', 'edit') && (
          <DropdownMenuItem onClick={approveAdminAccess}>Approve Admin Access</DropdownMenuItem>
        )}
        <DropdownMenuItem>Edit</DropdownMenuItem>
        <DropdownMenuItem>Make a copy</DropdownMenuItem>
        <DropdownMenuItem>Favorite</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>Labels</DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            {/* <DropdownMenuRadioGroup value={task.label}>
              {labels.map((label) => (
                <DropdownMenuRadioItem key={label.value} value={label.value}>
                  {label.label}
                </DropdownMenuRadioItem>
              ))}
            </DropdownMenuRadioGroup> */}
          </DropdownMenuSubContent>
        </DropdownMenuSub>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          Delete
          <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
