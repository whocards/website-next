import type {Preview} from '@storybook/react'
import {themes} from '@storybook/theming'
import {withThemeByClassName} from '@storybook/addon-themes'
import * as React from 'react'

import '~/styles/globals.css'
import {Toaster} from '../src/components/ui/toaster'
import {nextIntl} from './next-intl'
import {aptlyFont, golosFont} from '../src/assets/fonts'

const preview: Preview = {
  parameters: {
    nextIntl,
    nextjs: {
      appDirectory: true,
    },
    staticDirs: ['../public', {from: '../src/assets/fonts', to: '/fonts'}],
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
    <span className={`${golosFont.variable}`} style={{fontFamily: 'Nunito Sans'}}>
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
