import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db/prisma";
import { env } from "@/lib/env";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { Session } from "inspector";
import { NextAuthOptions } from "next-auth";
import { Adapter } from "next-auth/adapters";
import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
//import { authOptions } from "@/app/lib/auth";

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST, authOptions };