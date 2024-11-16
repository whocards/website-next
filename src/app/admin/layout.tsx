import {protectedRoute} from '~/server/auth'

export default async function AdminLayout({children}: {children: React.ReactNode}) {
  await protectedRoute()
  return <div>{children}</div>
}
