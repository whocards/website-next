import type {Metadata} from 'next'
import {PurchaseForm} from '~/features/purchases/purchase-form'

export const metadata: Metadata = {
  title: 'WhoCards | New Purchase',
  description: 'WhoCards New Purchase',
}

export default async function PurchaseDetailsPage() {
  return (
    <>
      <h1 className='text-3xl font-bold'>New Purchase</h1>
      <PurchaseForm />
    </>
  )
}
