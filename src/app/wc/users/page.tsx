import type {Metadata} from 'next'
import {UsersTable} from '~/features/users/users-table'
import {api} from '~/trpc/server'

export const metadata: Metadata = {
  title: 'WhoCards | Users',
  description: 'WhoCards Users',
}

export default async function AdminPage() {
  const users = await api.users.getAll()

  return (
    <>
      <h1 className='text-3xl font-bold'>Users</h1>
      <UsersTable data={users} />
    </>
  )
}
