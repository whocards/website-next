import type {Metadata} from 'next'
import {DataTable} from '~/components/table/data-table'
import {columns} from '~/features/cards/cards-columns'
import {api} from '~/trpc/server'

export const metadata: Metadata = {
  title: 'WhoCards | Cards',
  description: 'WhoCards Cards',
}

export default async function AdminPage() {
  const data = await api.cards.getAll()

  return (
    <>
      <h1 className='text-3xl font-bold'>Cards</h1>
      <DataTable data={data} columns={columns} />
    </>
  )
}
