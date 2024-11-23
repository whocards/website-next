import {redirect} from 'next/navigation'
import {type Metadata} from 'next'
import {ProfileForm} from '~/components/forms/profile-form'
import {PurchasesTable} from '~/features/purchases/purchases-table'
import {auth} from '~/server/auth'
import {api} from '~/trpc/server'

export const metadata: Metadata = {
  title: 'WhoCards | Me',
  description: 'What about me?',
}

export default async function ProfilePage() {
  const session = await auth()

  if (!session?.user) {
    redirect('/login')
  }

  const myPurchases = await api.purchases.getMine()

  return (
    <div className='container mx-auto flex flex-col gap-8 p-6'>
      <h1 className='text-3xl font-bold'>Profile</h1>

      <ProfileForm user={session?.user} />

      <div>
        <h2 className='mb-4 text-2xl font-semibold'>Purchase History</h2>
        <PurchasesTable data={myPurchases} />
      </div>
    </div>
  )
}
