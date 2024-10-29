import type {Preview} from '@storybook/react'
import {themes} from '@storybook/theming'
import {withThemeByClassName} from '@storybook/addon-themes'
import * as React from 'react'

import '~/styles/globals.css'
import {Toaster} from '../src/components/ui/toaster'
import {nextIntl} from './next-intl'
import * as Fonts from '../src/assets/fonts'

const fontVariables = Object.values(Fonts)
  .map((font) => font.variable)
  .join(' ')

const preview: Preview = {
  parameters: {
    nextIntl,
    nextjs: {
      appDirectory: true,
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    options: {
      storySort: {
        method: 'alphabetical',
      },
    },
    darkMode: {
      classTarget: 'html',
      stylePreview: true,
      darkClass: 'dark',
      lightClass: 'light',
      // Override the default dark theme
      dark: {...themes.dark},
      // Override the default light theme
      light: {...themes.normal},
      // Set the initial theme
      current: 'dark',
    },
  },
  initialGlobals: {
    locale: 'en',
    locales: {
      en: {icon: '🇺🇸', title: 'English', right: 'EN'},
      // fr: 'Français',
    },
  },
}

export const decorators = [
  (Story) => (
    <span className={`${fontVariables} font-sans`}>
      <Story />
      <Toaster />
    </span>
  ),
  withThemeByClassName({
    themes: {
      light: 'light',
      dark: 'dark',
    },
    defaultTheme: 'dark',
  }),
]

export default preview
