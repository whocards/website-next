import {HydrateClient} from '~/trpc/server'

export default async function HomePage() {
  return (
    <HydrateClient>
      <h1 className='font-sans text-3xl'>home</h1>
      <h1 className='font-title text-3xl'>home</h1>
    </HydrateClient>
  )
}
