import {Plus} from 'lucide-react'
import type {Metadata} from 'next'
import Link from 'next/link'
import {DataTable} from '~/components/table/data-table'
import {Button} from '~/components/ui/button'
import {columns} from '~/features/purchases/purchases-columns'
import {api} from '~/trpc/server'

import countries from '~/assets/data/countries.json'

const countryOptions = countries.map((country) => ({
  label: country.name,
  value: country.iso2,
  icon: country.emoji,
}))

export const metadata: Metadata = {
  title: 'WhoCards | Purchases',
  description: 'WhoCards Purchases',
}

export default async function AdminPage() {
  const purchases = await api.purchases.getAll()

  return (
    <>
      <div className='flex items-center justify-between'>
        <h1 className='text-3xl font-bold'>Purchases</h1>
        <Button asChild>
          <Link href='/wc/purchases/new'>
            <Plus className='mr-1 h-4 w-4' />
            New Purchase
          </Link>
        </Button>
      </div>
      <DataTable
        data={purchases}
        columns={columns}
        rowLink
        searchColumn='user_name'
        filterColumns={[{columnId: 'shipping_country', options: countryOptions}]}
      />
    </>
  )
}
