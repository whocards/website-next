import {PostHog} from 'posthog-node'
import {env} from '~/env'

export const PostHogClient = () => {
  if (env.NEXT_PUBLIC_POSTHOG_DISABLED) return
  return new PostHog(env.NEXT_PUBLIC_POSTHOG_KEY, {
    host: env.NEXT_PUBLIC_POSTHOG_HOST,
    flushAt: 20,
    flushInterval: 10,
  })
}
