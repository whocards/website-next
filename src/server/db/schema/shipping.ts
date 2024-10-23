import {integer, serial, text} from 'drizzle-orm/pg-core'

import * as Util from '../utils'
import {purchase} from './purchase'

export const shipping = Util.createTable('shipping', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull(),
  phone: text('phone').notNull(),
  company: text('company'),
  address: text('address').notNull(),
  address2: text('address2'),
  zip: text('zip').notNull(),
  city: text('city').notNull(),
  region: text('region'),
  quantity: integer('quantity').notNull(),
  country: text('country').notNull(),
  purchaseId: text('purchaseId')
    .notNull()
    .references(() => purchase.id)
    .unique(),
  ...Util.createUpdateTimestamps,
})
