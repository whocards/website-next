import {DrizzleAdapter} from '@auth/drizzle-adapter'
import {type DefaultSession, type NextAuthConfig} from 'next-auth'
import GithubProvider from 'next-auth/providers/github'
import GoogleProvider from 'next-auth/providers/google'
import {env} from '~/env'

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
  debug: true,
  pages: {
    signIn: '/login',
  },
  providers: [
    GithubProvider({
      redirectProxyUrl: env.AUTH_REDIRECT_PROXY_URL,
    }),
    GoogleProvider({
      redirectProxyUrl: env.AUTH_REDIRECT_PROXY_URL,
    }),
  ],
  adapter: DrizzleAdapter(db, {
    usersTable: authUsers,
    accountsTable: authAccounts,
    sessionsTable: authSessions,
    verificationTokensTable: authVerificationTokens,
  }),
  callbacks: {
    redirect: ({url, baseUrl}) => {
      console.log('[NextAuth] Redirect callback invoked:', {url, baseUrl})
      return url.startsWith(baseUrl) ? url : baseUrl
    },
    async signIn({user, account, profile}) {
      console.log('[NextAuth] SignIn callback invoked:', {user, account, profile})
      return true // Ensure you don't reject logins unintentionally
    },
    session: ({session, user}) => {
      console.log('[NextAuth] Session callback invoked:', {session, user})
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
