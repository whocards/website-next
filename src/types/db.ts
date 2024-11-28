import {createInsertSchema, createSelectSchema} from 'drizzle-zod'
import {z} from 'zod'

import {authUsers, cards, purchases, shippings, UserRoles, users} from '~/server/db/schema'

export const authUserSchema = createSelectSchema(authUsers, {
  roles: z.array(z.enum(UserRoles)),
})
export type AuthUser = z.infer<typeof authUserSchema>

export const userSchema = createSelectSchema(users)
export type PurchaseUser = z.infer<typeof userSchema>

export const userCreateSchema = createInsertSchema(users)
export type PurchaseUserCreate = z.infer<typeof userCreateSchema>

export const purchaseSchema = createSelectSchema(purchases)
export type Purchase = z.infer<typeof purchaseSchema>

export const purchaseCreateSchema = createInsertSchema(purchases)
export type PurchaseCreate = z.infer<typeof purchaseCreateSchema>

export const shippingSchema = createSelectSchema(shippings)
export type Shipping = z.infer<typeof shippingSchema>

export const shippingCreateSchema = createInsertSchema(shippings)
export type ShippingCreate = z.infer<typeof shippingCreateSchema>

export const purchaseCompleteSchema = purchaseSchema.extend({
  user: userSchema,
  shipping: shippingSchema,
})
export type PurchaseComplete = z.infer<typeof purchaseCompleteSchema>

export const purchaseCompleteCreateSchema = purchaseSchema.omit({id: true, userId: true, date: true}).extend({
  user: userCreateSchema.omit({id: true}),
  shipping: shippingCreateSchema.omit({id: true, purchaseId: true}),
})
export type PurchaseCompleteCreate = z.infer<typeof purchaseCompleteCreateSchema>

export const cardSchema = createSelectSchema(cards)
export type Card = z.infer<typeof cardSchema>
