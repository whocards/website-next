import createNextIntlPlugin from 'next-intl/plugin'

import './src/env.js'

const withNextIntl = createNextIntlPlugin()

/** @type {import("next").NextConfig} */
const config = {
  compiler: {
    removeConsole: {
      exclude: ['error', 'warn'],
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'utfs.io',
        port: '',
        pathname: '/**',
      },
    ],
  },
  redirects: async () => [
    {
      source: '/storybook',
      destination: '/storybook/index.html', // Point to your Storybook build folder
      statusCode: 308,
    },
  ],
  webpack(webpackConfig) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    webpackConfig.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    })

    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return webpackConfig
  },
}

export default withNextIntl(config)
