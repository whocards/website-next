import type {StorybookConfig} from '@storybook/experimental-nextjs-vite'
import commonjs from 'vite-plugin-commonjs'

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    '@storybook/addon-themes',
    'storybook-next-intl',
  ],
  framework: '@storybook/experimental-nextjs-vite',
  viteFinal: async (config) => {
    config.plugins = config.plugins || []
    config.plugins.push(commonjs())

    return config
  },
}
export default config
