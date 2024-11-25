import {TRPCError} from '@trpc/server'
import {desc, eq} from 'drizzle-orm'
import {z} from 'zod'
import {hasPermission, hasRole} from '~/lib/permissions'
import {createTRPCRouter, protectedProcedure} from '~/server/api/trpc'
import {authUsers} from '~/server/db/schema'

export const usersRouter = createTRPCRouter({
  getMe: protectedProcedure.query(async ({ctx}) => {
    if (!ctx.session?.user) {
      return
    }

    const user = await ctx.db.query.authUsers.findFirst({where: eq(authUsers.id, ctx.session?.user.id)})

    if (!hasPermission(ctx.session?.user, 'users', 'view', user)) {
      throw new TRPCError({code: 'UNAUTHORIZED'})
    }

    return user
  }),
  getById: protectedProcedure.input(z.string()).query(async ({ctx, input}) => {
    const user = await ctx.db.query.authUsers.findFirst({where: eq(authUsers.id, input)})

    if (!hasPermission(ctx.session?.user, 'users', 'view', user)) {
      throw new TRPCError({code: 'UNAUTHORIZED'})
    }

    return user
  }),
  getAll: protectedProcedure.query(async ({ctx}) => {
    if (!hasPermission(ctx.session?.user, 'users', 'view')) {
      throw new TRPCError({code: 'UNAUTHORIZED'})
    }

    return await ctx.db.query.authUsers.findMany({
      orderBy: desc(authUsers.email),
    })
  }),
  requestAdminAccess: protectedProcedure.mutation(async ({ctx}) => {
    if (!hasRole(ctx.session?.user, 'user', true)) {
      throw new TRPCError({code: 'BAD_REQUEST', message: 'You already have admin access'})
    }

    const user = await ctx.db.query.authUsers.findFirst({where: eq(authUsers.id, ctx.session?.user.id)})

    if (!user) {
      throw new TRPCError({code: 'NOT_FOUND', message: 'User not found'})
    }

    if (!hasPermission(ctx.session?.user, 'users', 'edit', user)) {
      throw new TRPCError({code: 'UNAUTHORIZED'})
    }

    return ctx.db.update(authUsers).set({requestedAdminAccess: true}).where(eq(authUsers.id, ctx.session?.user.id))
  }),
  approveAdminAccess: protectedProcedure.input(z.string()).mutation(async ({ctx, input}) => {
    if (!hasPermission(ctx.session?.user, 'users', 'edit')) {
      throw new TRPCError({code: 'UNAUTHORIZED'})
    }

    const user = await ctx.db.query.authUsers.findFirst({where: eq(authUsers.id, input)})

    if (!user) {
      throw new TRPCError({code: 'NOT_FOUND', message: 'User not found'})
    }

    if (!user.requestedAdminAccess) {
      throw new TRPCError({code: 'BAD_REQUEST', message: 'User has not requested admin access'})
    }

    return ctx.db
      .update(authUsers)
      .set({roles: ['user', 'admin'], requestedAdminAccess: false})
      .where(eq(authUsers.id, input))
  }),
})
