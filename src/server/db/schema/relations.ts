import {relations} from 'drizzle-orm'

import {purchase} from './purchase'
import {shipping} from './shipping'
import {user} from './user'

export const userRelations = relations(user, ({many}) => ({
  purchases: many(purchase),
}))

export const purchaseRelations = relations(purchase, ({one}) => ({
  shipping: one(shipping, {
    fields: [purchase.id],
    references: [shipping.purchaseId],
  }),
  user: one(user, {
    fields: [purchase.userId],
    references: [user.id],
  }),
}))

export const shippingRelations = relations(shipping, ({one}) => ({
  purchase: one(purchase, {
    fields: [shipping.purchaseId],
    references: [purchase.id],
  }),
}))
