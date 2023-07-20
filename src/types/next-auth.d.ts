import { Role } from "@prisma/client";
import { DefaultUser } from "next-auth";

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: DefaultUser & {
      id: string;
      role: Role;
    };
  }
  interface User {
    role: Role;
  }
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    id: string;
    role: Role;
  }
}
