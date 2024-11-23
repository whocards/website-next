import type {Metadata} from 'next'
import {DataTable} from '~/components/table/data-table'
import {userColumns} from '~/features/users/users-columns'
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
      <DataTable data={users} columns={userColumns} />
    </>
  )
}
