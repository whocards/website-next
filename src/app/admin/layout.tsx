import {cookies} from 'next/headers'
import {redirect} from 'next/navigation'
import {AdminSidebar} from '~/components/admin/nav-sidebar'
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

  return (
    <SidebarProvider defaultOpen={defaultSidebarOpen}>
      <AdminSidebar />
      <SidebarInset>
        {/* <header className='flex h-16 shrink-0 items-center gap-2 border-b'> */}
        {/* Maybe add breadcrumbs or title here */}
        {/* </header> */}
        {children}
      </SidebarInset>
    </SidebarProvider>
  )
}
