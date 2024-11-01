import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { JWT } from "next-auth/jwt"
import { signInSchema } from "./lib/zod"
import bcrypt from "bcrypt"
import { prisma } from "./app/db"

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
        // console.log("userExist"+JSON.stringify(userExist))
        const data = {
          id : userExist.id,
          name : userExist.name,
          email:userExist.email
        }
        // console.log(data)
        // if user dont exits
        return data
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
      if (user) { // Add user data to the token
        token.id = user.id ?? '';
        token.name = user.name ?? '';
        token.email = user.email ?? '';
        emailVerified: token.emailVerified instanceof Date ? token.emailVerified : null      }
      return token;
    },
    session({ session, token }) {
      if (token.id) {
        session.user = {
          id: token.id ?? '',
          name: token.name ?? '',
          email: token.email ?? '',
          emailVerified: token.emailVerified instanceof Date ? token.emailVerified : null
        };
      }
      return session;
    },
  },
})