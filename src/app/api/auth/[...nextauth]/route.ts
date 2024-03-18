import { prisma } from "@/lib/db/prisma";
import { env } from "@/lib/env";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { Session } from "inspector";
import { NextAuthOptions } from "next-auth";
import { Adapter } from "next-auth/adapters";
import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(prisma) as Adapter,
    providers: [GoogleProvider({
        clientId: env.GOOGLE_CLIENT_ID,
        clientSecret: env.GOOGLE_CLIENT_SECRET
    })
    ],
    //Nu merge,trebuie revenit la asta
    // callbacks: {
    //     session({session,user}) {
    //         session.user.id= user.id;
    //         return session;
    //                             },
    //     },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST }