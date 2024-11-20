import {TRPCError} from '@trpc/server'
import {count, eq, or, sql, sum} from 'drizzle-orm'
import {createTRPCRouter, protectedProcedure} from '~/server/api/trpc'
import {purchases, shippings, users} from '~/server/db/schema'

const dateSql = sql`TO_CHAR(${purchases.date}, 'YYYY-MM')`

export const purchasesRouter = createTRPCRouter({
  getAll: protectedProcedure.query(({ctx}) => {
    return ctx.db.query.purchases.findMany({
      with: {
        user: true,
        shipping: true,
      },
    })
  }),
  getByMonth: protectedProcedure.query(({ctx}) => {
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
  getByCountry: protectedProcedure.query(({ctx}) => {
    return ctx.db
      .select({
        country: shippings.country,
        count: count(),
      })
      .from(shippings)
      .groupBy(shippings.country)
      .orderBy(({count}) => count)
  }),
  getMine: protectedProcedure.query(async ({ctx}) => {
    const email = ctx.session?.user?.email

    if (!email) {
      throw new TRPCError({code: 'UNAUTHORIZED'})
    }

    const user = await ctx.db.query.users.findFirst({where: eq(users.email, email)})

    if (!user) {
      return []
    }

    return ctx.db.query.purchases.findMany({
      with: {
        user: true,
        shipping: true,
      },
      where: (purchases, {eq}) =>
        or(
          eq(purchases.userId, user.id)
          // eq(purchases.shipping.email, email)
        ),
    })
  }),
})
