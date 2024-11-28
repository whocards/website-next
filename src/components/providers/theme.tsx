'use client'

import {ThemeProvider as NextThemesProvider} from 'next-themes'
import {TooltipProvider} from '../ui/tooltip'
import {NuqsAdapter} from 'nuqs/adapters/next/app'

export function ThemeProvider({children, ...props}: React.ComponentProps<typeof NextThemesProvider>) {
  return (
    <NextThemesProvider {...props}>
      <TooltipProvider delayDuration={0}>
        <NuqsAdapter>{children}</NuqsAdapter>
      </TooltipProvider>
    </NextThemesProvider>
  )
}
