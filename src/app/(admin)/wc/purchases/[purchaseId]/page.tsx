import type {Metadata} from 'next'
import {PurchaseForm} from '~/features/purchases/purchase-form'
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

  console.log({data})

  return (
    <>
      <h1 className='text-3xl font-bold'>Purchase Details</h1>
      {data ? (
        <>
          {/* @ts-expect-error TODO: fix this typing issue */}
          <PurchaseForm purchase={data} />
        </>
      ) : (
        <p>Purchase not found</p>
      )}
    </>
  )
}
