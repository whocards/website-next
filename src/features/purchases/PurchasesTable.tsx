'use client'

import {api} from '~/trpc/react'

export const PurchasesTable = () => {
  const [purchases] = api.purchases.getAll.useSuspenseQuery()

  // const utils = api.useUtils()

  return (
    <div className='w-full max-w-xs'>
      {purchases.map((purchase) => (
        <div key={purchase.id}>{purchase.user.name}</div>
      ))}
    </div>
  )
}
