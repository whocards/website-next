import {eq} from 'drizzle-orm'

import {createTRPCRouter, protectedProcedure} from '~/server/api/trpc'
import {user} from '~/server/db/schema'
import {selectUserSchema} from '~/types/user'

export const userRouter = createTRPCRouter({
  getById: protectedProcedure.input(selectUserSchema.pick({id: true})).query(async ({ctx, input}) => {
    const user = await ctx.db.query.user.findFirst({
      where: (user, {eq}) => eq(user.id, input.id),
    })

    return user
  }),
  getAll: protectedProcedure.query(async ({ctx}) => {
    return await ctx.db.query.user.findMany()
  }),
  getCount: protectedProcedure.query(({ctx}) => {
    return ctx.db.$count(user)
  }),
  update: protectedProcedure.input(selectUserSchema).mutation(async ({ctx, input}) => {
    // TODO: validate user is allowed to update this user
    // TODO: invalidate session if role changes
    const [updated] = await ctx.db.update(user).set(input).where(eq(user.id, input.id)).returning()

    return updated
  }),
  getCurrentUser: protectedProcedure.query(async ({ctx}) => {
    const {id} = ctx.session.user
    const user = await ctx.db.query.user.findFirst({
      where: (user, {eq}) => eq(user.id, id),
    })

    return user!
  }),
})
