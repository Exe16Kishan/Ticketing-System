import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { JWT } from "next-auth/jwt"
import { signInSchema } from "./lib/zod"
import bcrypt from "bcrypt"
import { signVerification } from "./app/actions/signUp"

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
        // fetch credentials
        const { email, password } = await signInSchema.parseAsync(credentials)
        // verify the user exists
        const user = await signVerification(email, password)
        // if user exits
        if (user?.success) {
          console.log("auth ts : "+ user.userExist)
          return user
        }
        // if user dont exits
        return null
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