import NextAuth, { NextAuthOptions, User, Session } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { JWT } from "next-auth/jwt";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";

interface ExtendedUser extends User {
  id: string;
  image?: string | null;
}

interface ExtendedJWT extends JWT {
  id?: string;
  image?: string | null;
}

export const authOptions: NextAuthOptions = {
  session: { strategy: "jwt" },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        if (!user) return null;

        const passwordMatch = await bcrypt.compare(
          credentials.password,
          user.password
        );

        if (!passwordMatch) return null;

        const extendedUser: ExtendedUser = {
          id: user.id,
          name: user.name,
          email: user.email,
          image: user.image ?? undefined,
        };

        return extendedUser;
      },
    }),
  ],
  callbacks: {
    async jwt({
      token,
      user,
    }: {
      token: ExtendedJWT;
      user?: ExtendedUser;
    }): Promise<ExtendedJWT> {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        token.image = user.image ?? null;
      }
      return token;
    },
    async session({
      session,
      token,
    }: {
      session: Session;
      token: ExtendedJWT;
    }): Promise<Session> {
      if (token && session.user) {
        (session.user as ExtendedUser).id = token.id ?? "";
        session.user.name = token.name;
        session.user.email = token.email!;
        session.user.image = token.image ?? undefined;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
