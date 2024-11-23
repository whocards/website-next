import {TRPCError} from '@trpc/server'
import {count, eq, or, sql, sum} from 'drizzle-orm'
import {hasPermission} from '~/lib/permissions'
import {createTRPCRouter, protectedProcedure} from '~/server/api/trpc'
import {purchases, shippings, users} from '~/server/db/schema'

const dateSql = sql`TO_CHAR(${purchases.date}, 'YYYY-MM')`

export const routerAnalytics = createTRPCRouter({
  purchasesByMonth: protectedProcedure.query(({ctx}) => {
    const canViewAnalytics = hasPermission(ctx.session?.user, 'portal', 'view')

    if (!canViewAnalytics) {
      throw new TRPCError({code: 'UNAUTHORIZED'})
    }

    return ctx.db
      .select({
        date: dateSql.mapWith(String),
        total: sum(purchases.netPrice).mapWith(Number),
        count: count(),
      })
      .from(purchases)
      .groupBy(dateSql)
      .orderBy(dateSql)
  }),
  purchasesByCountry: protectedProcedure.query(({ctx}) => {
    const canViewAnalytics = hasPermission(ctx.session?.user, 'portal', 'view')

    if (!canViewAnalytics) {
      throw new TRPCError({code: 'UNAUTHORIZED'})
    }

    return ctx.db
      .select({
        country: shippings.country,
        count: count(),
      })
      .from(shippings)
      .groupBy(shippings.country)
      .orderBy(({count}) => count)
  }),
  purchasesByQuantity: protectedProcedure.query(({ctx}) => {
    const canViewAnalytics = hasPermission(ctx.session?.user, 'portal', 'view')

    if (!canViewAnalytics) {
      throw new TRPCError({code: 'UNAUTHORIZED'})
    }

    return ctx.db
      .select({
        quantity: shippings.quantity,
        count: count(),
        total: sum(shippings.quantity).mapWith(Number),
      })
      .from(shippings)
      .groupBy(shippings.quantity)
      .orderBy(({count}) => count)
  }),
})
