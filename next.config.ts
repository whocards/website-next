/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
import './src/env'
import type {NextConfig} from 'next'

const config: NextConfig = {
  reactStrictMode: true,
  // compiler: {
  //   removeConsole: {
  //     exclude: ['error', 'warn'],
  //   },
  // },
  experimental: {
    turbo: {
      rules: {
        '*.svg': {
          loaders: [
            {
              loader: '@svgr/webpack',
              options: {
                typescript: true,
                ext: 'tsx',
              },
            },
          ],
          as: '*.tsx',
        },
      },
    },
  },
  webpack: (webpackConfig) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    webpackConfig.module.rules.push({
      test: /\.svg$/,
      use: [
        {
          loader: '@svgr/webpack',
          options: {
            typescript: true,
            ext: 'tsx',
          },
        },
      ],
    })

    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return webpackConfig
  },
}

export default config
