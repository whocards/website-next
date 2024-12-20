import {DrizzleAdapter} from '@auth/drizzle-adapter'
import {type DefaultSession, type NextAuthConfig} from 'next-auth'
import GithubProvider from 'next-auth/providers/github'
import GoogleProvider from 'next-auth/providers/google'
import ResendProvider from 'next-auth/providers/resend'

import {env} from '~/env'
import {db} from '~/server/db'
import {authAccounts, authSessions, authUsers, authVerificationTokens, type UserRole} from '~/server/db/schema'

const from = 'noreply@whocards.cc'

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
    signOut: '/logout',
  },
  providers: [
    GithubProvider({redirectProxyUrl: env.AUTH_REDIRECT_PROXY_URL}),
    GoogleProvider({redirectProxyUrl: env.AUTH_REDIRECT_PROXY_URL}),
    ResendProvider({from}),
  ],
  adapter: DrizzleAdapter(db, {
    usersTable: authUsers,
    accountsTable: authAccounts,
    sessionsTable: authSessions,
    verificationTokensTable: authVerificationTokens,
  }),
  callbacks: {
    session: ({session, user}) => {
      return {
        ...session,
        user: {
          ...session.user,
          id: user.id,
          roles: user.roles,
        },
      }
    },
  },
} satisfies NextAuthConfig
