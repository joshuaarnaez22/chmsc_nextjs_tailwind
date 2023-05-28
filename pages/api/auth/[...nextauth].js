import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "@/lib/prisma";
import bcrypt from "bcrypt";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "email" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials, req) {
        const { email, password } = credentials;
        try {
          const user = await prisma.user.findFirst({
            where: { email },
            include: { profile: true },
          });
          // If user does not exist,
          if (!user) return null;

          // If user exist compare provided password and hashpassword
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
    maxAge: 60 * 60,
  },
  jwt: {
    maxAge: 60 * 60,
  },
  pages: {
    signIn: "/",
    signOut: "/",
  },
};

export default NextAuth(authOptions);
