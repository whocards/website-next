import '~/styles/globals.css'

import {GeistSans} from 'geist/font/sans'
import {type Metadata} from 'next'

import {TRPCReactProvider} from '~/trpc/react'
import {ThemeProvider} from '~/components/providers'
import {SessionProvider} from 'next-auth/react'

export const metadata: Metadata = {
  title: 'WhoCards',
  description: 'Do you dare?',
  icons: [
    {rel: 'icon', url: '/favicons/favicon-light.svg', type: 'image/svg+xml', media: '(prefers-color-scheme: light)'},
    {rel: 'icon', url: '/favicons/favicon-dark.svg', type: 'image/svg+xml', media: '(prefers-color-scheme: dark)'},
    {rel: 'apple-touch-icon', url: '/favicons/apple-touch-icon.png'},
    {rel: 'icon', url: '/favicon.ico'},
  ],
}

export default function RootLayout({children}: Readonly<{children: React.ReactNode}>) {
  return (
    <html lang='en' className={`${GeistSans.variable}`} suppressHydrationWarning>
      <body>
        <TRPCReactProvider>
          <SessionProvider>
            <ThemeProvider
              attribute='class'
              defaultTheme='system'
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
