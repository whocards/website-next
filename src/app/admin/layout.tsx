import {cookies} from 'next/headers'
import {redirect} from 'next/navigation'
import {AppSidebar} from '~/components/nav-sidebar'
import {SIDEBAR_COOKIE_NAME, SidebarInset} from '~/components/ui/sidebar'
import {SidebarProvider} from '~/components/ui/sidebar'
import {auth} from '~/server/auth'

export default async function AdminLayout({children}: {children: React.ReactNode}) {
  const session = await auth()
  const cookie = await cookies()

  const defaultSidebarOpen = cookie.get(SIDEBAR_COOKIE_NAME)?.value === 'true'

  if (!session?.user) {
    redirect('/api/auth/signin')
  }

  if (!session.user.roles.includes('admin') && !session.user.roles.includes('owner')) {
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
