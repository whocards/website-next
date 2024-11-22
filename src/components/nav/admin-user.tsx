'use client'

import Link from 'next/link'
import {LogOut, User, Sun, Moon} from 'lucide-react'

import {Avatar, AvatarFallback, AvatarImage} from '~/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '~/components/ui/dropdown-menu'
import {SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar} from '~/components/ui/sidebar'
import {signOut} from 'next-auth/react'
import {useSessionUser} from '~/hooks/use-session-user'
import {useTheme} from 'next-themes'

export const NavUser = () => {
  const {isMobile} = useSidebar()
  const user = useSessionUser()
  const {resolvedTheme, setTheme} = useTheme()

  if (!user) return null

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size='lg'
              className='data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground'
            >
              <Avatar className='h-8 w-8 rounded-lg'>
                <AvatarImage src={user.image ?? undefined} alt={user.name ?? undefined} />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <div className='grid flex-1 text-left text-sm leading-tight'>
                <span className='truncate font-semibold'>{user.name}</span>
                <span className='truncate text-xs'>{user.email}</span>
              </div>
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className='w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg'
            side='bottom'
            align='end'
          >
            <DropdownMenuLabel className='p-0 font-normal'>
              <div className='flex items-center gap-2 px-1 py-1.5 text-left text-sm'>
                <Avatar className='h-8 w-8 rounded-lg'>
                  <AvatarImage src={user.image ?? undefined} alt={user.name ?? undefined} />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
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
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
