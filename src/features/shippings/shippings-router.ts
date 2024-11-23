import {TRPCError} from '@trpc/server'
import {eq} from 'drizzle-orm'
import {z} from 'zod'
import {hasPermission} from '~/lib/permissions'
import {createTRPCRouter, protectedProcedure} from '~/server/api/trpc'
import {shippings} from '~/server/db/schema'

export const shippingsRouter = createTRPCRouter({
  getAll: protectedProcedure.query(({ctx}) => {
    const permission = hasPermission(ctx.session?.user, 'shippings', 'view')

    if (!permission) {
      throw new TRPCError({code: 'UNAUTHORIZED'})
    }

    return ctx.db.query.shippings.findMany()
  }),
  getById: protectedProcedure.input(z.object({shippingId: z.number()})).query(({ctx, input}) => {
    const permission = hasPermission(ctx.session?.user, 'shippings', 'view')

    if (!permission) {
      throw new TRPCError({code: 'UNAUTHORIZED'})
    }

    return ctx.db.query.shippings.findFirst({where: eq(shippings.id, input.shippingId)})
  }),
})
