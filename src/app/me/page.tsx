import Link from 'next/link'
import {Button} from '~/components/ui/button'
import {hasPermission} from '~/lib/permissions'
import {auth} from '~/server/auth'

export default async function ProfilePage() {
  const session = await auth()

  const canAccessAdmin = hasPermission(session?.user, 'portal', 'view')

  return (
    <>
      <div>Profile Page more to come</div>
      {canAccessAdmin && (
        <Button asChild>
          <Link href='/wc'>Admin page</Link>
        </Button>
      )}
    </>
  )
}
