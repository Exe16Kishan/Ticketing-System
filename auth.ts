import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { signInSchema } from "./lib/zod"
import bcrypt from "bcrypt"
import { prisma } from "./app/db"
import { JWT } from "next-auth/jwt"

declare module "next-auth/jwt" {
  interface JWT {
    id?: string
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      authorize: async (credentials) => {
        if (!credentials) {
          return null
        }
        // fetch credentials
        const { email, password } = await signInSchema.parseAsync(credentials)
        // search for the user
        const userExist = await prisma.user.findUnique({
          where: {
            email
          }
        })
        // if user not found
        if (!userExist || !userExist.password) {
          return null
        }
        // compare the hashed pass 
        const hashedPasswordValidate = await bcrypt.compare(password, userExist?.password);
        // if password not validates
        if (!hashedPasswordValidate) {
          return null
        }
        return userExist
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
      if (user) { 
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