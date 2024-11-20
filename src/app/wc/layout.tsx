import type {Metadata} from 'next'
import {cookies} from 'next/headers'
import {redirect} from 'next/navigation'
import {AppSidebar} from '~/components/nav-sidebar'
import {SIDEBAR_COOKIE_NAME, SidebarInset} from '~/components/ui/sidebar'
import {SidebarProvider} from '~/components/ui/sidebar'
import {hasPermission} from '~/lib/permissions'
import {auth} from '~/server/auth'

export const metadata: Metadata = {
  title: 'WhoCards | Admin',
  description: 'WhoCards Admin',
}

export default async function AdminLayout({children}: {children: React.ReactNode}) {
  const session = await auth()
  const cookie = (await cookies()).get(SIDEBAR_COOKIE_NAME)

  const defaultSidebarOpen = cookie?.value === undefined ? undefined : cookie?.value === 'true'

  if (!session?.user) {
    redirect('/login')
  }

  if (!hasPermission(session.user, 'portal', 'view')) {
    redirect('/')
  }

  return (
    <SidebarProvider defaultOpen={defaultSidebarOpen}>
      <AppSidebar />
      <SidebarInset>
        {/* <header className='flex h-16 shrink-0 items-center gap-2 border-b'> */}
        {/* Maybe add breadcrumbs or title here */}
        {/* </header> */}
        {children}
      </SidebarInset>
    </SidebarProvider>
  )
}
