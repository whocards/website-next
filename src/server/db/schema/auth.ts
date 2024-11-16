import {relations} from 'drizzle-orm'
import {index, integer, primaryKey, text, timestamp, varchar} from 'drizzle-orm/pg-core'
import {type AdapterAccount} from 'next-auth/adapters'
import * as Utils from '../utils'

export const authUsers = Utils.createUserTable('user', {
  id: Utils.userId('id')
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: varchar('name', {length: 255}),
  email: varchar('email', {length: 255}).notNull(),
  emailVerified: timestamp('email_verified', Utils.timestampSettings).default(Utils.currentTimestamp),
  image: varchar('image', {length: 255}),
})

export const authUsersRelations = relations(authUsers, ({many}) => ({
  accounts: many(authAccounts),
}))

export const authAccounts = Utils.createUserTable(
  'account',
  {
    userId: Utils.userId().references(() => authUsers.id),
    type: varchar('type', {length: 255}).$type<AdapterAccount['type']>().notNull(),
    provider: varchar('provider', {length: 255}).notNull(),
    providerAccountId: varchar('provider_account_id', {
      length: 255,
    }).notNull(),
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
    userIdIdx: index('account_user_id_idx').on(account.userId),
  })
)

export const authAccountsRelations = relations(authAccounts, ({one}) => ({
  user: one(authUsers, {fields: [authAccounts.userId], references: [authUsers.id]}),
}))

export const authSessions = Utils.createUserTable(
  'session',
  {
    sessionToken: varchar('session_token', {length: 255}).notNull().primaryKey(),
    userId: Utils.userId().references(() => authUsers.id),
    expires: timestamp('expires', Utils.timestampSettings).notNull(),
  },
  (session) => ({
    userIdIdx: index('session_user_id_idx').on(session.userId),
  })
)

export const authSessionsRelations = relations(authSessions, ({one}) => ({
  user: one(authUsers, {fields: [authSessions.userId], references: [authUsers.id]}),
}))

export const authVerificationTokens = Utils.createUserTable(
  'verification_token',
  {
    identifier: varchar('identifier', {length: 255}).notNull(),
    token: varchar('token', {length: 255}).notNull(),
    expires: timestamp('expires', Utils.timestampSettings).notNull(),
  },
  (vt) => ({
    compoundKey: primaryKey({columns: [vt.identifier, vt.token]}),
  })
)
