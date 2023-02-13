import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "@/lib/prisma";
import bcrypt from "bcrypt";
import { PrismaAdapter } from "@next-auth/prisma-adapter";

export const authOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "email" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials, req) {
        const { email, password } = await credentials;
        try {
          const user = await prisma.user.findFirst({
            where: { email },
            include: { profile: true },
          });
          console.log(user);
          const comparePassword = bcrypt.compareSync(password, user.password);

          if (!comparePassword) return null;

          delete user["password"];
          return user;
        } catch (error) {
          throw new Error(error.message);
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.user = user;
      return token;
    },
    async session({ session, token }) {
      session.user = token.user;
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
    maxAge: Number(process.env.SESSION_TIME),
  },
  pages: {
    signIn: "/",
    signOut: "/",
  },
};

export default NextAuth(authOptions);
