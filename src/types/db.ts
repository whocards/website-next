import {createSelectSchema} from 'drizzle-zod'
import type {z} from 'zod'

import {authUsers, purchases, shippings, users} from '~/server/db/schema'

export const authUserSchema = createSelectSchema(authUsers)
export type AuthUser = z.infer<typeof authUserSchema>

export const userSchema = createSelectSchema(users)
export type PurchaseUser = z.infer<typeof userSchema>

export const purchaseSchema = createSelectSchema(purchases)
export type Purchase = z.infer<typeof purchaseSchema>

export const shippingSchema = createSelectSchema(shippings)
export type Shipping = z.infer<typeof shippingSchema>
