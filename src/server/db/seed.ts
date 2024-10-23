import {getTableName, sql, type Table} from 'drizzle-orm'
import {drizzle} from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import 'dotenv/config'

import {env} from '~/env'

import * as schema from './schema'
// import * as seeds from './seeds'

// const recordCounts = {}

const conn = postgres(env.DATABASE_URL, {max: 1})

export const db = drizzle(conn, {schema, logger: false})

async function resetTable(table: Table) {
  return db.execute(sql.raw(`TRUNCATE TABLE ${getTableName(table)} RESTART IDENTITY CASCADE`))
}

// TODO copy and add current user back at the end

for (const table of []) {
  await resetTable(table)
}
console.log('Tables reset')

if (process.env.RESET_DB_ONLY) process.exit(0)

// await seeds.users(db, recordCounts)

console.log('Seeding complete')

await conn.end()
