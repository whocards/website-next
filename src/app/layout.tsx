import '~/styles/globals.css'

import {GeistSans} from 'geist/font/sans'
import {type Metadata} from 'next'

import {ThemeProvider} from '~/components/providers/theme'
import {AnalyticsProvider} from '~/components/providers/analytics'
import {ServerProviders} from '~/components/providers/server'
import {AnalyticsPageView} from '~/components/analytics-page-view'

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
      <AnalyticsProvider>
        <ServerProviders>
          <body>
            <AnalyticsPageView />
            <ThemeProvider
              attribute='class'
              defaultTheme='system'
              enableSystem
              disableTransitionOnChange
              enableColorScheme
            >
              {children}
            </ThemeProvider>
          </body>
        </ServerProviders>
      </AnalyticsProvider>
    </html>
  )
}
