import { prisma } from "../../../lib/prisma";
import { compare } from "bcryptjs";
import CredentialsProvider from "next-auth/providers/credentials";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import NextAuth from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
const googleID = process.env.GOOGLE_CLIENT_ID;
const googleSecret = process.env.GOOGLE_CLIENT_SECRET;

export const authOptions = {
    adaper: PrismaAdapter(prisma),
    pages: "/login",
    session: {
        strategy: "jwt",
    },
    providers: [
        GoogleProvider({
            clientId: googleID,
            clientSecret: googleSecret,
        }),
        GitHubProvider({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET,
        }),
        CredentialsProvider({
        name: "Sign in",
        credentials: {
            email: {
            label: "Email",
            type: "email",
            placeholder: "example@example.com",
            },
            password: { label: "Password", type: "password" },
        },
        async authorize(credentials) {
            if (!credentials?.email || !credentials.password) {
            return null;
            }

            const user = await prisma.user.findUnique({
            where: {
                email: credentials.email,
            },
            });

            if (!user || !(await compare(credentials.password, user.password))) {
            return null;
            }
            return {
            id: user.id,
            email: user.email,
            name: user.name,
            };
        },
        }),
    ],
        callbacks: {
            session: ({ session, token }) => {
                console.log("Session Callback", { session, token });
                return {
                    ...session,
                    user: {
                    ...session.user,
                    id: token.id,
                    },
                };
                },
            jwt: ({ token, user }) => {
                console.log("JWT Callback", { token, user });
                if (user) {
                    const u = user;
                    return {
                    ...token,
                    id: u.id,
                    };
                }
                return token;
                },
            }
        };

    const handler = NextAuth(authOptions);
    export {handler as GET, handler as POST}
