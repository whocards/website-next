import {relations} from 'drizzle-orm'
import {boolean, serial, text} from 'drizzle-orm/pg-core'

import * as Util from '../utils'
import {purchase} from './purchase'

// user -> many purchases
export const user = Util.createUserTable('user', {
  id: serial('id').primaryKey(),
  email: text('email').notNull().unique(),
  ocSlug: text('oc_slug'),
  name: text('name').notNull(),
  newsletter: boolean('newsletter').default(false).notNull(),
})

export const userRelations = relations(user, ({many}) => ({
  purchases: many(purchase),
}))
