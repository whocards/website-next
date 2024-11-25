'use client'

import posthog from 'posthog-js'
import {PostHogProvider} from 'posthog-js/react'
import {env} from '~/env'

if (typeof window !== 'undefined' && env.NEXT_PUBLIC_POSTHOG_KEY) {
  posthog.init(env.NEXT_PUBLIC_POSTHOG_KEY, {
    api_host: '/ingest',
    person_profiles: 'always',
    capture_pageview: false, // We capture pageviews in the AnalyticsPageView component
    capture_pageleave: true,
  })
}

export function AnalyticsProvider({children}: {children: React.ReactNode}) {
  if (!env.NEXT_PUBLIC_POSTHOG_DISABLED) return <>{children}</>
  return <PostHogProvider client={posthog}>{children}</PostHogProvider>
}
