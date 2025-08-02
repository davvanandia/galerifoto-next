import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      image?: string;
    } & DefaultSession["user"];
  }

  interface User {
    id: string;
    image?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    image?: string;
  }
}
