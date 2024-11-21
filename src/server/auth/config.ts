import {DrizzleAdapter} from '@auth/drizzle-adapter'
import {type DefaultSession, type NextAuthConfig} from 'next-auth'
import GithubProvider from 'next-auth/providers/github'
import GoogleProvider from 'next-auth/providers/google'

import {db} from '~/server/db'
import {authAccounts, authSessions, authUsers, authVerificationTokens, type UserRole} from '~/server/db/schema'

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module 'next-auth' {
  interface Session extends DefaultSession {
    user: {
      id: string
      // ...other properties
      roles: UserRole[]
    } & DefaultSession['user']
  }

  interface User {
    roles: UserRole[]
  }
}

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authConfig = {
  pages: {
    signIn: '/login',
  },
  providers: [GithubProvider, GoogleProvider],
  adapter: DrizzleAdapter(db, {
    usersTable: authUsers,
    accountsTable: authAccounts,
    sessionsTable: authSessions,
    verificationTokensTable: authVerificationTokens,
  }),
  callbacks: {
    session: ({session, user}) => ({
      ...session,
      user: {
        ...session.user,
        id: user.id,
        roles: user.roles,
      },
    }),
  },
} satisfies NextAuthConfig
