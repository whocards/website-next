import {ChartCountries} from '~/features/analytics/chart-countries'
import {ChartPurchases} from '~/features/analytics/chart-purchases'
import {api} from '~/trpc/server'

const regionNames = new Intl.DisplayNames(['en'], {type: 'region'})

export default async function AnalyticsPage() {
  const [purchases, countries] = await Promise.all([api.purchases.getByMonth(), api.purchases.getByCountry()])

  const countriesWithNames = countries.map((c) => ({
    ...c,
    country: regionNames.of(c.country) ?? c.country,
  }))

  const totalPurchases = purchases.reduce((acc, purchase) => acc + purchase.count, 0)

  return (
    <div className='flex w-full flex-col gap-5 p-4'>
      <h1 className='text-center text-2xl md:text-4xl'>Dashboards</h1>
      <div className='grid grid-cols-1 gap-3'>
        <ChartPurchases data={purchases} total={totalPurchases} />
        <ChartCountries data={countriesWithNames} />
      </div>
    </div>
  )
}
