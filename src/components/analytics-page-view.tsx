'use client'

import {usePathname, useSearchParams} from 'next/navigation'
import {Suspense, useEffect} from 'react'
import {usePostHog} from 'posthog-js/react'
import {useSession} from 'next-auth/react'

import {env} from '~/env'

const PageViews = () => {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const posthog = usePostHog()

  // 👉 Add the hooks into the component
  const {status, data: session} = useSession()
  const user = session?.user

  // Track pageviews
  useEffect(() => {
    if (env.NEXT_PUBLIC_POSTHOG_DISABLED) return
    if (pathname && posthog) {
      let url = window.origin + pathname
      if (searchParams.toString()) {
        url = url + `?${searchParams.toString()}`
      }
      posthog.capture('$pageview', {
        $current_url: url,
      })
    }
  }, [pathname, searchParams, posthog])

  useEffect(() => {
    if (env.NEXT_PUBLIC_POSTHOG_DISABLED) return
    const isSignedIn = status === 'authenticated'
    const userId = user?.id
    // 👉 Check the sign-in status and user info,
    //    and identify the user if they aren't already
    if (isSignedIn && userId && user && !posthog._isIdentified()) {
      // 👉 Identify the user
      posthog.identify(userId, {
        email: user.email,
        username: user.name,
      })
    }
  }, [posthog, user, status])

  return null
}

export const AnalyticsPageView = () => {
  return (
    <Suspense>
      <PageViews />
    </Suspense>
  )
}
