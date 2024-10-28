import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { JWT } from "next-auth/jwt"
 
declare module "next-auth/jwt" {
  interface JWT {
    id?: string
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [
        Credentials({
            // You can specify which fields should be submitted, by adding keys to the `credentials` object.
            // e.g. domain, username, password, 2FA token, etc.
            credentials: {
              email: {},
              password: {},
            },
            authorize: async (credentials) => {
            //   let user = null
       console.log(credentials)
            //   // logic to salt and hash password
            //   const pwHash = saltAndHashPassword(credentials.password)
       
            //   // logic to verify if the user exists
            //   user = await getUserFromDb(credentials.email, pwHash)
       
            //   if (!user) {
            //     // No user found, so this is their first attempt to login
            //     // meaning this is also the place you could do registration
            //     throw new Error("User not found.")
            //   }
       
              // return user object with their profile data
              return credentials
            },
          }),
    ],
    pages: {
        signIn: '/auth/signin',  // Customize your sign-in page path if needed
    },
    session:{
        strategy:"jwt"
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