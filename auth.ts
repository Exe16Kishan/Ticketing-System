import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { JWT } from "next-auth/jwt"
import { signInSchema } from "./lib/zod"
import bcrypt from "bcrypt"

declare module "next-auth/jwt" {
  interface JWT {
    id?: string
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
       
        console.log(credentials)
 
        return credentials
      },
    }),
  ],
  pages: {
    signIn: '/auth/signin',  // route to sign in page
  },
  session: {
    strategy: "jwt"
  },
  callbacks: {
    jwt({ token, user }) {
      if (user) { // User is available during sign-in
        token.id = user.id
      }
      return token
    },
    session({ session, token }) {
      if (token.id) {

        session.user.id = token.id
      }
      return session
    },
  },
})