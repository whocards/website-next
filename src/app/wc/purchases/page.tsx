import type {Metadata} from 'next'
import {PurchasesTable} from '~/features/purchases/purchases-table'
import {api} from '~/trpc/server'

export const metadata: Metadata = {
  title: 'WhoCards | Purchases',
  description: 'WhoCards Purchases',
}

export default async function AdminPage() {
  const purchases = await api.purchases.getAll()

  return (
    <>
      <h1 className='text-3xl font-bold'>Purchases</h1>
      <PurchasesTable data={purchases} />
    </>
  )
}
