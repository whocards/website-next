import Link from 'next/link'
import {redirect} from 'next/navigation'
import {type Metadata} from 'next'
import {ProfileForm} from '~/components/forms/profile-form'
import {Button} from '~/components/ui/button'
import {PurchasesTable} from '~/features/purchases/PurchasesTable'
import {hasPermission} from '~/lib/permissions'
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

  const isAdmin = hasPermission(session?.user, 'portal', 'view')
  const myPurchases = await api.purchases.getMine()

  return (
    <div className='container mx-auto flex flex-col gap-8 p-6'>
      <h1 className='text-3xl font-bold'>Profile</h1>
      {isAdmin && (
        <p>
          Role: Admin{' '}
          <Button asChild variant='link'>
            <Link href='/wc'>Visit Admin page</Link>
          </Button>
        </p>
      )}
      <ProfileForm user={session?.user} />

      <div>
        <h2 className='mb-4 text-2xl font-semibold'>Purchase History</h2>
        <PurchasesTable purchases={myPurchases} />
      </div>
    </div>
  )
}
