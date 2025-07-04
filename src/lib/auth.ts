import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { getServerSession, type NextAuthOptions } from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import { db } from "./prisma";

// Extend the Session type to include isSubscribed

declare module "next-auth" {
  interface Session {
    user: {
      name?: string | null;
      email?: string | null;
      image?: string | null;
      isSubscribed?: boolean;
    };
  }
}

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(db),
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  session: {
    strategy: "database",
  },
  callbacks: {
    async session({ session, user }) {
      const dbUser = await db.user.findUnique({ where: { id: user.id } });
      if (session.user) {
        session.user.isSubscribed = dbUser?.isSubscribed || false;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  logger: {
    error: (code, metadata) => {
      console.error(`NextAuth error: ${code}`, metadata);
    },
  },
  debug: true,
};

export const auth = () => getServerSession(authOptions);
