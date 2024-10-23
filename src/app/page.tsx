import {HydrateClient} from '~/trpc/server'

export default async function HomePage() {
  return (
    <HydrateClient>
      <div>home</div>
    </HydrateClient>
  )
}
