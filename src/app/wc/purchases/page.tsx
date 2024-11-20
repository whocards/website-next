import {PurchasesTable} from '~/features/purchases/PurchasesTable'
import {api} from '~/trpc/server'

export default async function AdminPage() {
  const purchases = await api.purchases.getAll()

  return <PurchasesTable purchases={purchases} />
}
