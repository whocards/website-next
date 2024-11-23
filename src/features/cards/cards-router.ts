import {TRPCError} from '@trpc/server'
import {hasPermission} from '~/lib/permissions'
import {createTRPCRouter, protectedProcedure} from '~/server/api/trpc'

export const cardsRouter = createTRPCRouter({
  getAll: protectedProcedure.query(({ctx}) => {
    const permission = hasPermission(ctx.session?.user, 'cards', 'view')

    if (!permission) {
      throw new TRPCError({code: 'UNAUTHORIZED'})
    }

    return ctx.db.query.cards.findMany()
  }),
})
