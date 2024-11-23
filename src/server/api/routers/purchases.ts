import {TRPCError} from '@trpc/server'
import {eq} from 'drizzle-orm'
import {hasPermission} from '~/lib/permissions'
import {createTRPCRouter, protectedProcedure} from '~/server/api/trpc'
import {users} from '~/server/db/schema'

export const purchasesRouter = createTRPCRouter({
  getAll: protectedProcedure.query(({ctx}) => {
    if (!hasPermission(ctx.session?.user, 'portal', 'view')) {
      throw new TRPCError({code: 'UNAUTHORIZED'})
    }

    return ctx.db.query.purchases.findMany({
      with: {
        user: true,
        shipping: true,
      },
    })
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
      where: (purchases, {eq}) => eq(purchases.userId, user.id),
      with: {
        user: true,
        shipping: true,
      },
    })
  }),
})
