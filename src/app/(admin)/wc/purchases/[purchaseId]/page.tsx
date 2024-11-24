import type {Metadata} from 'next'
import {api} from '~/trpc/server'

export const metadata: Metadata = {
  title: 'WhoCards | Purchase Details',
  description: 'WhoCards Purchase Details',
}

type Props = {
  params: Promise<{
    purchaseId: string
  }>
}

export default async function PurchaseDetailsPage({params}: Props) {
  const {purchaseId} = await params
  const data = await api.purchases.getById(purchaseId)

  return (
    <>
      <h1 className='text-3xl font-bold'>Purchase Details</h1>
      {data ? (
        <>
          <p>Purchase ID: {data.id}</p>
        </>
      ) : (
        <p>Purchase not found</p>
      )}
    </>
  )
}
