import NextAuth from "next-auth"
import CredentialsProvider from 'next-auth/providers/credentials';
import { prisma } from "./app/db";

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [

        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: { label: 'Email', type: 'email' },
                password: { label: 'Password', type: 'password' },
            },
            async authorize(credentials) {
                const { email, password } = credentials as { email: string; password: string };
                if (!email || !password) {
                    throw new Error('provide email or password');

                }

                // Find user in database
                const user = await prisma.user.findUnique({
                    where: {
                        email
                    },
                });

                // Check if user exists and password matches (plain-text for demo)
                if (user && user.password === password) {
                    return user;
                } else {
                    throw new Error('Invalid email or password');
                }
            },
        }),
    ],
    pages: {
        signIn: '/auth/signin',  // Customize your sign-in page path if needed
    },
})