import '~/styles/globals.css'

import {type Metadata} from 'next'
import {NextIntlClientProvider} from 'next-intl'
import {getLocale, getMessages} from 'next-intl/server'
import {type ReactNode} from 'react'

import SessionWrapper from '~/components/SessionProvider'
import {TRPCReactProvider} from '~/trpc/react'

export const metadata: Metadata = {
  title: 'WhoCards',
  description: 'Do you dare?',
  icons: [{rel: 'icon', url: '/favicon.ico'}],
}

export default async function RootLayout({children}: Readonly<{children: ReactNode}>) {
  const locale = await getLocale()

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages()

  return (
    <html lang={locale}>
      <body>
        <SessionWrapper>
          <TRPCReactProvider>
            <NextIntlClientProvider messages={messages}>{children}</NextIntlClientProvider>
          </TRPCReactProvider>
        </SessionWrapper>
      </body>
    </html>
  )
}
