'use client'

import type {ComponentProps} from 'react'

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
import {NavUser} from './nav-user'
import {ChartNoAxesCombined, ShoppingCart, Truck} from 'lucide-react'

const data = {
  navMain: [
    {title: 'Dashboard', url: '/admin', icon: ChartNoAxesCombined},
    {
      title: 'Purchases',
      url: '/admin/purchases',
      icon: ShoppingCart,
    },
    {
      title: 'Shipments',
      url: '/admin/shipments',
      icon: Truck,
    },
  ],
}

export function AdminSidebar({...props}: ComponentProps<typeof Sidebar>) {
  const pathname = usePathname()
  const {open, isMobile} = useSidebar()

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
              {data.navMain.map((item) => (
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
          <NavUser />
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