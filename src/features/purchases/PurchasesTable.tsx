'use client'

import type {RouterOutputs} from '~/trpc/react'

type Props = {
  purchases: RouterOutputs['purchases']['getAll']
}

export const PurchasesTable = ({purchases}: Props) => {
  return (
    <div className='w-full max-w-xs'>
      {purchases.map((purchase) => (
        <div key={purchase.id}>{purchase.user.name}</div>
      ))}
    </div>
  )
}
