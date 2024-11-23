import {createCallerFactory, createTRPCRouter} from '~/server/api/trpc'

import {purchasesRouter} from './routers/purchases'
import {usersRouter} from './routers/users'
import {routerAnalytics} from '~/features/analytics/router-analytics'

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  purchases: purchasesRouter,
  users: usersRouter,
  analytics: routerAnalytics,
})

// export type definition of API
export type AppRouter = typeof appRouter

/**
 * Create a server-side caller for the tRPC API.
 * @example
 * const trpc = createCaller(createContext);
 * const res = await trpc.post.all();
 *       ^? Post[]
 */
export const createCaller = createCallerFactory(appRouter)
