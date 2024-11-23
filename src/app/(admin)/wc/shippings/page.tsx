import type {Metadata} from 'next'
import {DataTable} from '~/components/table/data-table'
import {columns} from '~/features/shippings/shippings-columns'
import {api} from '~/trpc/server'

export const metadata: Metadata = {
  title: 'WhoCards | Shippings',
  description: 'WhoCards Shippings',
}

export default async function AdminPage() {
  const data = await api.shippings.getAll()

  return (
    <>
      <h1 className='text-3xl font-bold'>Shippings</h1>
      <DataTable data={data} columns={columns} />
    </>
  )
}
