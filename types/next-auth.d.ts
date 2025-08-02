import NextAuth, { DefaultSession, DefaultUser } from "next-auth";
import { JWT as DefaultJWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      image?: string | null;
    } & DefaultSession["user"];
  }

  interface User extends DefaultUser {
    id: string;
    image?: string | null;
  }
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    id?: string;
    image?: string | null;
  }
}
