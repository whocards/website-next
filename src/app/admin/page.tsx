import {ChartPurchases} from '~/features/analytics/chart-purchases'
import {api} from '~/trpc/server'

export default async function AnalyticsPage() {
  const purchases = await api.purchases.getByMonth()

  const totalPurchases = purchases.reduce((acc, purchase) => acc + purchase.count, 0)

  return (
    <div className='flex w-full flex-col gap-5 p-4'>
      <h1 className='text-center text-2xl md:text-4xl'>Dashboards</h1>
      <div className='grid grid-cols-1 gap-3 md:grid-cols-2'>
        <ChartPurchases data={purchases} total={totalPurchases} />
      </div>
    </div>
  )
}
