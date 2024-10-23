import {createInsertSchema, createSelectSchema} from 'drizzle-zod'
import {type z} from 'zod'

import {purchase, shipping, user} from '~/server/db/schema'

export const insertUserSchema = createInsertSchema(user)
export const selectUserSchema = createSelectSchema(user)

export type InsertUser = z.infer<typeof insertUserSchema>
export type SelectUser = z.infer<typeof selectUserSchema>

export const insertPurchaseSchema = createInsertSchema(purchase)
export const selectPurchaseSchema = createSelectSchema(purchase)

export type InsertPurchase = z.infer<typeof insertPurchaseSchema>
export type SelectPurchase = z.infer<typeof selectPurchaseSchema>

export const insertShippingSchema = createInsertSchema(shipping)
export const selectShippingSchema = createSelectSchema(shipping)

export type InsertShipping = z.infer<typeof insertShippingSchema>
export type SelectShipping = z.infer<typeof selectShippingSchema>
