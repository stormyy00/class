import { DrizzleAdapter } from "@auth/drizzle-adapter";
import {
  Session,
  getServerSession,
  type DefaultSession,
  type NextAuthOptions,
} from "next-auth";
import { type Adapter } from "next-auth/adapters";
import Googleprovider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import GitHubProvider from "next-auth/providers/github";
// import EmailProvider from "next-auth/providers/email";
import { compare, hash } from "bcrypt";
import { env } from "@/utils/env";
import { db } from "@/server/db";
import {
  accounts,
  sessions,
  users,
  verificationTokens,
} from "@/server/db/schema";
// import { cookies } from "next/headers";
// import crypto from "crypto";

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      // ...other properties
      // role: UserRole;
    } & DefaultSession["user"];
  }

  // interface User {
  //   // ...other properties
  //   // role: UserRole;
  // }
}

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */

export const authOptions: NextAuthOptions = {
  callbacks: {
    // session: ({ session, user }) => ({
    //   ...session,
    //   user: {
    //     ...session.user,
    //     id: user.id,
    //   },
    // }),
    async jwt({ token, user, account, isNewUser }) {
      // isNewUser = true only on user creation, can be used
      // to update db and session
      // if (isNewUser && user && account) {
      //   const data = await updateUser(user, account);
      //   user = { ...user, ...data };
      // }

      user && (token.user = user);
      return token;
    },
    async session({ session, token }) {
      let _session: Session | undefined = undefined;
      const user = token.user;
      // put just user's immutable props in session (id and email)
      // for session user use useUser React Query state
      if (user) {
        _session = {
          ...session,
          user: {
            id: user.id,
            email: user.email,
            name: user.name,
            image: user.image,
          },
        };
      }
      return _session;
    },
  },
  session: {
    strategy: "jwt",
    maxAge: 60 * 60, // 1h
  },
  pages: {
    signIn: "/signin",
  },
  adapter: DrizzleAdapter(db, {
    usersTable: users,
    accountsTable: accounts,
    sessionsTable: sessions,
    verificationTokensTable: verificationTokens,
  }) as Adapter,
  providers: [
    Googleprovider({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    }),
    GitHubProvider({
      clientId: env.GITHUB_CLIENT_ID,
      clientSecret: env.GITHUB_CLIENT_SECRET,
    }),
    // EmailProvider({
    //   server: env.EMAIL_SERVER,
    //   from: env.EMAIL_FROM,
    // }),
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "credentials",
      // `credentials` is used to generate a form on the sign in page.
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        name: { label: "Full Name", type: "text" },
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials) {
          return null;
        }

        let user = await db.query.users.findFirst({
          where: (users, { eq }) => eq(users.email, credentials.email),
        });
        // console.log(user);
        if (!user) {
          const [newUser] = await db
            .insert(users)
            .values({
              name: credentials.name,
              email: credentials.email,
              password: await hash(credentials.password, 10),
            } as typeof users.$inferInsert)
            .returning();

          user = newUser;
          // console.log("db", user);
        }

        if (!user || !user.password) {
          return null;
        }

        const comparison = await compare(credentials.password, user.password);
        console.log(comparison);
        if (!comparison) {
          return null;
        }

        return {
          id: user.id,
          name: user.name,
          email: user.email,
        };
      },
    }),

    /**
     * ...add more providers here.
     *
     * Most other providers require a bit more work than the GOOGLE provider. For example, the
     * GitHub provider requires you to add the `refresh_token_expires_in` field to the Account
     * model. Refer to the NextAuth.js docs for the provider you want to use. Example:
     *
     * @see https://next-auth.js.org/providers/github
     */
  ],
};

/**
 * Wrapper for `getServerSession` so that you don't need to import the `authOptions` in every file.
 *
 * @see https://next-auth.js.org/configuration/nextjs
 */
export const getServerAuthSession = () => getServerSession(authOptions);
