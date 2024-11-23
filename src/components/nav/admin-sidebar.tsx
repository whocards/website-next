'use client'

import {useMemo, type ComponentProps} from 'react'

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarSeparator,
  SidebarTrigger,
  useSidebar,
} from '~/components/ui/sidebar'
import {usePathname} from 'next/navigation'
import Link from 'next/link'

import Logo from '~/assets/icons/logo.svg'
import LogoIcon from '~/assets/icons/logo-icon.svg'
import {UserMenu} from './user-menu'
import {ChartNoAxesCombined, ShoppingCart, Users, Truck} from 'lucide-react'
import {useSessionUser} from '~/hooks/use-session-user'
import CardIcon from '~/assets/icons/card-plain.svg'
import {CurrentUserAvatar} from '../user-avatar'
import {hasPermission, type Permission} from '~/lib/permissions'

// TODO move up to parent - layout
const navAdmin = {
  navMain: [
    {title: 'Dashboard', url: '/wc', icon: ChartNoAxesCombined},
    {
      title: 'Purchases',
      url: '/wc/purchases',
      icon: ShoppingCart,
    },
    // {
    //   title: 'Shipments',
    //   url: '/wc/shipments',
    //   icon: Truck,
    // },
  ],
}

const navRequirePermission = [
  {
    permission: 'shippings',
    title: 'Shippings',
    url: '/wc/shippings',
    icon: Truck,
  },
  {
    permission: 'users',
    title: 'Users',
    url: '/wc/users',
    icon: Users,
  },
  {
    permission: 'cards',
    title: 'Cards',
    url: '/wc/cards',
    icon: CardIcon,
  },
]

export function AppSidebar({...props}: ComponentProps<typeof Sidebar>) {
  const pathname = usePathname()
  const {open, isMobile} = useSidebar()
  const user = useSessionUser()

  const navMain = useMemo(() => {
    const items = [...navAdmin.navMain]
    navRequirePermission.forEach(({permission, ...item}) => {
      if (hasPermission(user, permission as Permission, 'view')) {
        items.push({
          ...item,
          icon: item.icon as unknown as (typeof navAdmin.navMain)[0]['icon'], // TODO this is a hack
        })
      }
    })
    return items
  }, [user])

  return (
    <>
      <Sidebar collapsible='icon' {...props}>
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem>
              <Link href='/'>{open ? <Logo className='m-2 h-8' /> : <LogoIcon className='m-2 h-8' />}</Link>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarMenu>
              {navMain.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={pathname === item.url}>
                    <Link href={item.url}>
                      {item.icon && <item.icon />}
                      {item.title}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton className='justify-end' asChild>
                <SidebarTrigger />
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
          <SidebarSeparator />
          <SidebarMenu>
            <SidebarMenuItem>
              <UserMenu>
                <SidebarMenuButton
                  size='lg'
                  className='data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground'
                >
                  <CurrentUserAvatar className='h-8 w-8 rounded-full transition-opacity data-[state=open]:opacity-50' />
                  <div className='grid flex-1 text-left text-sm leading-tight'>
                    <span className='truncate font-semibold'>{user?.name}</span>
                    <span className='truncate text-xs'>{user?.email}</span>
                  </div>
                </SidebarMenuButton>
              </UserMenu>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
        <SidebarRail />
      </Sidebar>
      {isMobile && (
        <div className='fixed bottom-5 left-5 z-50'>
          <SidebarTrigger variant='outline' className='h-10 w-10 rounded-full' />
        </div>
      )}
    </>
  )
}
