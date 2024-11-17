import Link from 'next/link'

import {HydrateClient} from '~/trpc/server'

export default async function HomePage() {
  return (
    <HydrateClient>
      <h1 className='font-sans text-3xl'>Login</h1>
      <Link href='/api/auth/login'>Login</Link>
    </HydrateClient>
  )
}
