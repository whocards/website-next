import {integer, text} from 'drizzle-orm/pg-core'

import * as Util from '../utils'
import {user} from './user'

export const purchase = Util.createTable('purchase', {
  id: text('id').primaryKey().notNull(),
  price: integer('price').notNull(),
  category: text('category').notNull(),
  netPrice: integer('netPrice').notNull(),
  userId: Util.userId().references(() => user.id),
  ...Util.createUpdateTimestamps,
})
