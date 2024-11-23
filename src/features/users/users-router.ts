import {TRPCError} from '@trpc/server'
import {hasPermission} from '~/lib/permissions'
import {createTRPCRouter, protectedProcedure} from '~/server/api/trpc'

export const usersRouter = createTRPCRouter({
  getAll: protectedProcedure.query(({ctx}) => {
    const canView = hasPermission(ctx.session?.user, 'users', 'view')

    if (!canView) {
      throw new TRPCError({code: 'UNAUTHORIZED'})
    }

    return ctx.db.query.authUsers.findMany()
  }),
})
