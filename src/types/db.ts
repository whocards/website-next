import {createInsertSchema, createSelectSchema} from 'drizzle-zod'
import {z} from 'zod'
import {categories} from '~/features/purchases/purchase-constants'

import {authUsers, cards, purchases, shippings, UserRoles, users} from '~/server/db/schema'

export const authUserSchema = createSelectSchema(authUsers, {
  roles: z.array(z.enum(UserRoles)),
})
export type AuthUser = z.infer<typeof authUserSchema>

export const userSchema = createSelectSchema(users)
export type PurchaseUser = z.infer<typeof userSchema>

export const userCreateSchema = createInsertSchema(users, {
  id: z.number().optional(),
  name: z.string().min(1),
  email: z.string().email(),
  newsletter: z.boolean().default(false).optional(),
})
export type PurchaseUserCreate = z.infer<typeof userCreateSchema>

export const purchaseSchema = createSelectSchema(purchases, {
  category: z.enum(categories),
})
export type Purchase = z.infer<typeof purchaseSchema>

export const purchaseCreateSchema = createInsertSchema(purchases, {
  id: z.string().optional(),
  userId: z.number().optional(),
  price: z.number().min(0),
  netPrice: z.number().min(0),
  category: z.enum(categories),
  date: z.date().optional(),
})
export type PurchaseCreate = z.infer<typeof purchaseCreateSchema>

export const shippingSchema = createSelectSchema(shippings)
export type Shipping = z.infer<typeof shippingSchema>

export const shippingCreateSchema = createInsertSchema(shippings, {
  id: z.number().optional(),
  purchaseId: z.string().optional(),
  name: z.string().min(1),
  email: z.string().email(),
  phone: z.string().min(1), // TODO add phone validation
  company: z.string().optional(),
  country: z.string().min(2, 'Country is required').max(2),
})
export type ShippingCreate = z.infer<typeof shippingCreateSchema>

export const purchaseCompleteSchema = purchaseSchema.extend({
  user: userSchema,
  shipping: shippingSchema,
})
export type PurchaseComplete = z.infer<typeof purchaseCompleteSchema>

export const purchaseCompleteCreateSchema = purchaseCreateSchema.extend({
  user: userCreateSchema,
  shipping: shippingCreateSchema,
})
export type PurchaseCompleteCreate = z.infer<typeof purchaseCompleteCreateSchema>

export const cardSchema = createSelectSchema(cards)
export type Card = z.infer<typeof cardSchema>
