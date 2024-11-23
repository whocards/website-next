import type {Metadata} from 'next'
import {api} from '~/trpc/server'

export const metadata: Metadata = {
  title: 'WhoCards | Shipping Details',
  description: 'WhoCards Shipping Details',
}

type Props = {
  params: {
    shippingId: string
  }
}

export default async function ShippingDetailsPage({params}: Props) {
  const data = await api.shippings.getById({shippingId: Number(params.shippingId)})

  return (
    <>
      <h1 className='text-3xl font-bold'>Shipping Details</h1>
      {data ? (
        <>
          <p>Shipping ID: {data.id}</p>
        </>
      ) : (
        <p>Shipping not found</p>
      )}
    </>
  )
}
