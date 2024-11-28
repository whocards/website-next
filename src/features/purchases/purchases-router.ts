import {TRPCError} from '@trpc/server'
import {eq} from 'drizzle-orm'
import {z} from 'zod'
import {hasPermission} from '~/lib/permissions'
import {createTRPCRouter, protectedProcedure} from '~/server/api/trpc'
import {purchases, shippings, users} from '~/server/db/schema'
import {purchaseCompleteCreateSchema, purchaseCompleteSchema} from '~/types/db'

export const purchasesRouter = createTRPCRouter({
  getAll: protectedProcedure.query(({ctx}) => {
    if (!hasPermission(ctx.session?.user, 'purchases', 'view')) {
      throw new TRPCError({code: 'UNAUTHORIZED'})
    }

    // TODO limit returned fields
    return ctx.db.query.purchases.findMany({
      with: {
        user: true,
        shipping: true,
      },
    })
  }),
  getById: protectedProcedure.input(z.string()).query(async ({ctx, input}) => {
    return ctx.db.query.purchases.findFirst({where: eq(purchases.id, input), with: {user: true, shipping: true}})
  }),
  getMine: protectedProcedure.query(async ({ctx}) => {
    const email = ctx.session?.user?.email

    if (!email) {
      throw new TRPCError({code: 'UNAUTHORIZED'})
    }

    const user = await ctx.db.query.users.findFirst({where: eq(users.email, email)})

    if (!user) {
      // || !hasPermission(ctx.session?.user, 'purchases', 'view')) {
      throw new TRPCError({code: 'UNAUTHORIZED'})
    }

    return ctx.db.query.purchases.findMany({
      where: (purchases, {eq}) => eq(purchases.userId, user.id),
      with: {
        user: true,
        shipping: true,
      },
    })
  }),
  updateOne: protectedProcedure.input(purchaseCompleteSchema).mutation(async ({ctx, input}) => {
    if (!hasPermission(ctx.session?.user, 'purchases', 'edit')) {
      throw new TRPCError({code: 'UNAUTHORIZED'})
    }

    return ctx.db.update(purchases).set(input).where(eq(purchases.id, input.id))
  }),
  createOne: protectedProcedure.input(purchaseCompleteCreateSchema).mutation(async ({ctx, input}) => {
    if (!hasPermission(ctx.session?.user, 'purchases', 'create')) {
      throw new TRPCError({code: 'UNAUTHORIZED'})
    }

    const {price, netPrice, category} = input

    return ctx.db.transaction(async (tx) => {
      const [user] = await tx.insert(users).values(input.user).returning()
      if (!user) {
        tx.rollback()
        throw new TRPCError({code: 'INTERNAL_SERVER_ERROR'})
      }

      const [purchase] = await tx
        .insert(purchases)
        .values({id: crypto.randomUUID(), price, netPrice, category, userId: user.id, date: new Date()})
        .returning()
      if (!purchase) {
        tx.rollback()
        throw new TRPCError({code: 'INTERNAL_SERVER_ERROR'})
      }

      await tx.insert(shippings).values({...input.shipping, purchaseId: purchase.id})
    })
  }),
})
