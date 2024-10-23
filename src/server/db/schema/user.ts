import {relations} from 'drizzle-orm'
import {boolean, index, integer, primaryKey, text, timestamp, varchar} from 'drizzle-orm/pg-core'
import type {AdapterAccount} from 'next-auth/adapters'

import * as Util from '../utils'
import {purchase} from './purchase'

export const user = Util.createUserTable('user', {
  id: Util.userId('id')
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  image: text('image'),
  newsletter: boolean('newsletter').default(false).notNull(),
  lastLogin: timestamp('last_login', Util.timestampSettings),
  ...Util.createUpdateTimestamps,
})

export const userAccountRelations = relations(user, ({many}) => ({
  purchases: many(purchase),
}))

export const accounts = Util.createUserTable(
  'account',
  {
    userId: Util.userId('userId').references(() => user.id),
    type: varchar('type', {length: 255}).$type<AdapterAccount['type']>().notNull(),
    provider: varchar('provider', {length: 255}).notNull(),
    providerAccountId: varchar('providerAccountId', {length: 255}).notNull(),
    refresh_token: text('refresh_token'),
    access_token: text('access_token'),
    expires_at: integer('expires_at'),
    token_type: varchar('token_type', {length: 255}),
    scope: varchar('scope', {length: 255}),
    id_token: text('id_token'),
    session_state: varchar('session_state', {length: 255}),
  },
  (account) => ({
    compoundKey: primaryKey({
      columns: [account.provider, account.providerAccountId],
    }),
    userIdIdx: index('account_userId_idx').on(account.userId),
  })
)

export const accountsRelations = relations(accounts, ({one}) => ({
  user: one(user, {fields: [accounts.userId], references: [user.id]}),
}))

export const sessions = Util.createTable(
  'session',
  {
    sessionToken: varchar('sessionToken', {length: 255}).notNull().primaryKey(),
    userId: Util.userId().references(() => user.id),
    expires: timestamp('expires', {mode: 'date'}).notNull(),
  },
  (session) => ({
    userIdIdx: index('session_userId_idx').on(session.userId),
  })
)

export const sessionsRelations = relations(sessions, ({one}) => ({
  user: one(user, {fields: [sessions.userId], references: [user.id]}),
}))

export const verificationTokens = Util.createUserTable(
  'verificationToken',
  {
    identifier: varchar('identifier', {length: 255}).notNull(),
    token: varchar('token', {length: 255}).notNull(),
    expires: timestamp('expires', {mode: 'date'}).notNull(),
  },
  (vt) => ({
    compoundKey: primaryKey({columns: [vt.identifier, vt.token]}),
  })
)
