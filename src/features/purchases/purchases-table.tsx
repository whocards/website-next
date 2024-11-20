'use client'

import {DataTable} from '~/components/table/data-table'
import type {PurchaseWithUserAndShipping} from '~/types/purchases'
import {purchaseColumns} from './purchases-columns'

type Props = {
  data: PurchaseWithUserAndShipping[]
}

export const PurchasesTable = ({data}: Props) => {
  return <DataTable data={data} columns={purchaseColumns} />
}
