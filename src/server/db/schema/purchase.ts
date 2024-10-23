import {relations} from 'drizzle-orm'
import {integer, text} from 'drizzle-orm/pg-core'

import * as Util from '../utils'
import {shipping} from './shipping'
import {user} from './user'

// purchase -> one user
export const purchase = Util.createTable('purchase', {
  id: text('id').primaryKey().notNull(),
  price: integer('price').notNull(),
  category: text('category').notNull(),
  netPrice: integer('netPrice').notNull(),
  userId: integer('user_id')
    .notNull()
    .references(() => user.id),
  ...Util.createUpdateTimestamps,
})

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
