import {DrizzleAdapter} from '@auth/drizzle-adapter'
import {eq} from 'drizzle-orm'
import {type DefaultSession, getServerSession, type NextAuthOptions} from 'next-auth'
import {type Adapter} from 'next-auth/adapters'
import GithubProvider, {type GithubProfile} from 'next-auth/providers/github'
import GoogleProvider, {type GoogleProfile} from 'next-auth/providers/google'

import {env} from '~/env'
import {db} from '~/server/db'
import {accounts, sessions, user as usersTable, verificationTokens} from '~/server/db/schema'

// TODO verify and fix initial login for non verified users?

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
      isSuperUser: boolean
      // ...other properties
    } & DefaultSession['user']
  }

  interface User {
    // ...other properties
    isSuperUser?: boolean
  }
}

const isSuperUser = (email?: string | null) => !!email && (env.ADMIN_EMAILS?.includes(email) ?? false)

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authOptions: NextAuthOptions = {
  callbacks: {
    signIn: async ({user}) => {
      await db.update(usersTable).set({lastLogin: new Date()}).where(eq(usersTable.id, user.id))

      return true
    },
    session: ({session, user}) => ({
      ...session,
      user: {
        ...session.user,
        id: user.id,
      },
    }),
  },
  adapter: DrizzleAdapter(db, {
    usersTable,
    accountsTable: accounts,
    sessionsTable: sessions,
    verificationTokensTable: verificationTokens,
  }) as Adapter,
  providers: [
    GithubProvider({
      clientId: env.GITHUB_CLIENT_ID,
      clientSecret: env.GITHUB_CLIENT_SECRET,
      profile: (profile: GithubProfile) => ({
        id: profile.id.toString(),
        name: profile.name ?? profile.login,
        email: profile.email,
        image: profile.avatar_url,
        isSuperUser: isSuperUser(profile.email),
      }),
    }),
    GoogleProvider({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
      profile: (profile: GoogleProfile) => {
        return {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
          image: profile.picture,
          isSuperUser: isSuperUser(profile.email),
        }
      },
    }),
    /**
     * ...add more providers here.
     *
     * Most other providers require a bit more work than the Github provider. For example, the
     * GitHub provider requires you to add the `refresh_token_expires_in` field to the Account
     * model. Refer to the NextAuth.js docs for the provider you want to use. Example:
     *
     * @see https://next-auth.js.org/providers/github
     */
  ],
}

/**
 * Wrapper for `getServerSession` so that you don't need to import the `authOptions` in every file.
 *
 * @see https://next-auth.js.org/configuration/nextjs
 */
export const getServerAuthSession = () => getServerSession(authOptions)
