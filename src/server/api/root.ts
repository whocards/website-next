import {createCallerFactory, createTRPCRouter} from '~/server/api/trpc'

import {analyticsRouter} from '~/features/analytics/router-analytics'
import {cardsRouter} from '~/features/cards/cards-router'
import {purchasesRouter} from '~/features/purchases/purchases-router'
import {shippingsRouter} from '~/features/shippings/shippings-router'
import {usersRouter} from '~/features/users/users-router'

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  analytics: analyticsRouter,
  cards: cardsRouter,
  purchases: purchasesRouter,
  shippings: shippingsRouter,
  users: usersRouter,
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
