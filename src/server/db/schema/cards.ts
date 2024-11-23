import {boolean, integer, serial, text} from 'drizzle-orm/pg-core'
import * as Utils from '../utils'

export const cards = Utils.createTable('card', {
  id: serial('id').primaryKey(),
  quantity: integer('quantity').notNull(),
  isBox: boolean('is_box').notNull(),
  isPurchased: boolean('is_purchased').notNull(),
  location: text('location').notNull(),
  ...Utils.createUpdateTimestamps,
})
