'use client'

import {DataTable} from '~/components/table/data-table'
import type {PurchaseWithUserAndShipping} from '~/types/purchases'
import {purchaseColumns} from './columns'

type Props = {
  purchases: PurchaseWithUserAndShipping[]
}

export const PurchasesTable = ({purchases}: Props) => {
  console.log(purchases)
  return <DataTable data={purchases} columns={purchaseColumns} />
}
