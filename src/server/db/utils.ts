import {sql} from 'drizzle-orm'
import {pgTableCreator, type PgTimestampConfig, timestamp, varchar} from 'drizzle-orm/pg-core'

export const createTable = pgTableCreator((name) => `whocards_${name}`)

export const createUserTable = pgTableCreator((name) => `auth_${name}`)

export const timestampSettings: PgTimestampConfig = {
  mode: 'date',
  withTimezone: true,
}

export const currentTimestamp = sql`CURRENT_TIMESTAMP`

export const createUpdateTimestamps = {
  createdAt: timestamp('created_at', timestampSettings).default(currentTimestamp).notNull(),
  updatedAt: timestamp('updated_at', timestampSettings).$onUpdate(() => new Date()),
}

export const userId = (key = 'user_id') => varchar(key, {length: 255}).notNull()
