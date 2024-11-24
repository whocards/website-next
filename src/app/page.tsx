import Link from 'next/link'
import {Navbar} from '~/components/nav/navbar'

import {Button} from '~/components/ui/button'
import {hasPermission} from '~/lib/permissions'
import {auth} from '~/server/auth'
import {HydrateClient} from '~/trpc/server'

export default async function Home() {
  const session = await auth()

  const canAccessAdmin = hasPermission(session?.user, 'portal', 'view')

  return (
    <>
      <Navbar />
      <main className='flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white'>
        <div className='container flex flex-col items-center justify-center gap-12 px-4 py-16'>
          <h1 className='text-5xl font-extrabold tracking-tight sm:text-[5rem]'>WhoCards App</h1>
          <Link
            href={session ? '/api/auth/signout' : '/login'}
            className='rounded-full bg-white/10 px-10 py-3 font-semibold no-underline transition hover:bg-white/20'
          >
            {session ? 'Sign out' : 'Sign in'}
          </Link>
          {canAccessAdmin && (
            <Button asChild>
              <Link href='/wc'>Admin page</Link>
            </Button>
          )}
        </div>
      </main>
    </>
  )
}
