// This file configures the initialization of Sentry on the client.
// The config you add here will be used whenever a users loads a page in their browser.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from '@sentry/nextjs'

import {env} from '~/env'

Sentry.init({
  enabled: process.env.NODE_ENV === 'production',
  dsn: env.NEXT_PUBLIC_SENTRY_DSN,
  debug: false,
  integrations: [],
  tracesSampleRate: 1,
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,
})

void import('@sentry/nextjs').then((lazyLoadedSentry) => {
  Sentry.addIntegration(lazyLoadedSentry.replayIntegration)
})
