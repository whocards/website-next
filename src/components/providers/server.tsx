import {TRPCReactProvider} from '~/trpc/react'
import {SessionProvider} from 'next-auth/react'
import {HydrateClient} from '~/trpc/server'

export const ServerProviders = ({children}: {children: React.ReactNode}) => {
  return (
    <TRPCReactProvider>
      <SessionProvider>
        <HydrateClient>{children}</HydrateClient>
      </SessionProvider>
    </TRPCReactProvider>
  )
}
