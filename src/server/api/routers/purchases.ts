import {count, sql, sum} from 'drizzle-orm'
import {createTRPCRouter, protectedProcedure} from '~/server/api/trpc'
import {purchases} from '~/server/db/schema'

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
})
