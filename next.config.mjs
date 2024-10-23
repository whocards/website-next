// @ts-check

import {withSentryConfig} from '@sentry/nextjs'
import createNextIntlPlugin from 'next-intl/plugin'

import {env} from './src/env.js'

const withNextIntl = createNextIntlPlugin()

/** @type {import("next").NextConfig} */
const config = {
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
    webpackConfig.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    })

    webpackConfig.ignoreWarnings = [{module: /@opentelemetry\/instrumentation/}]

    return webpackConfig
  },
}

export default withSentryConfig(withNextIntl(config), {
  // https://github.com/getsentry/sentry-webpack-plugin#options
  // https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/
  org: env.SENTRY_ORG,
  project: env.SENTRY_PROJECT,
  silent: !process.env.CI, // Only print logs for uploading source maps in CI
  widenClientFileUpload: true, // Upload a larger set of source maps for prettier stack traces (increases build time)
  tunnelRoute: '/monitoring',
  hideSourceMaps: true, // Hides source maps from generated client bundles
  disableLogger: true, // Automatically tree-shake Sentry logger statements to reduce bundle size
  automaticVercelMonitors: true, // Enables automatic instrumentation of Vercel Cron Monitors. (Does not yet work with App Router route handlers.)
  reactComponentAnnotation: {
    enabled: true, // Automatically annotate React components to show their full name in breadcrumbs and session replay
  },
})
