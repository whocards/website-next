import '~/styles/globals.css'

import {GeistSans} from 'geist/font/sans'
import {type Metadata} from 'next'

import {TRPCReactProvider} from '~/trpc/react'
import {ThemeProvider} from '~/components/providers'
import {SessionProvider} from 'next-auth/react'
export const metadata: Metadata = {
  title: 'Create T3 App',
  description: 'Generated by create-t3-app',
  icons: [{rel: 'icon', url: '/favicon.ico'}],
}

export default function RootLayout({children}: Readonly<{children: React.ReactNode}>) {
  return (
    <html lang='en' className={`${GeistSans.variable}`} suppressHydrationWarning>
      <body>
        <TRPCReactProvider>
          <SessionProvider>
            <ThemeProvider
              attribute='class'
              defaultTheme='dark'
              enableSystem
              disableTransitionOnChange
              enableColorScheme
            >
              {children}
            </ThemeProvider>
          </SessionProvider>
        </TRPCReactProvider>
      </body>
    </html>
  )
}
