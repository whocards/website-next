'use client'

import Link from 'next/link'
import {LogOut, User, Sun, Moon} from 'lucide-react'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '~/components/ui/dropdown-menu'
import {signOut} from 'next-auth/react'
import {useSessionUser} from '~/hooks/use-session-user'
import {useTheme} from 'next-themes'
import {UserAvatar} from '../user-avatar'
import type {DropdownMenuContentProps} from '@radix-ui/react-dropdown-menu'

type Props = DropdownMenuContentProps

export const UserMenu = ({side = 'bottom', align = 'end', children, ...props}: Props) => {
  const user = useSessionUser()
  const {resolvedTheme, setTheme} = useTheme()

  if (!user) return null

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className='cursor-pointer'>
        {children}
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className='w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg'
        side={side}
        align={align}
        {...props}
      >
        <DropdownMenuLabel className='p-0 font-normal'>
          <div className='flex items-center gap-2 px-1 py-1.5 text-left text-sm'>
            <UserAvatar className='h-8 w-8 rounded-full' image={user.image} name={user.name} />
            <div className='grid flex-1 text-left text-sm leading-tight'>
              <span className='truncate font-semibold'>{user.name}</span>
              <span className='truncate text-xs'>{user.email}</span>
            </div>
          </div>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem asChild className='cursor-pointer'>
            <Link href='/me' className='group'>
              <User />
              Profile
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}>
            {resolvedTheme === 'dark' ? (
              <>
                <Sun />
                Light mode
              </>
            ) : (
              <>
                <Moon />
                Dark mode
              </>
            )}
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => void signOut({redirectTo: '/login'})}>
          <LogOut />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
