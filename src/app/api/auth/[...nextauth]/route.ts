import { Role } from "@prisma/client";
import NextAuth, { type NextAuthOptions, Session } from "next-auth";
import { JWT } from "next-auth/jwt";
import CredentialsProvider from "next-auth/providers/credentials";
import { getBarberShopDataForToken } from "services/barber/get";
import authorizeUser from "services/user/authorize";

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      name: "Sign in",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "johndoe@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        return authorizeUser(credentials);
      },
    }),
  ],
  callbacks: {
    async session({ session, token }: { session: Session; token: JWT }) {
      session.user.role = token.role;
      session.user.id = token.id;

      if (token.role === Role.SALON_OWNER) {
        const barber_shop_data = await getBarberShopDataForToken(
          token.email as string
        );

        session.user.name = barber_shop_data.name as string;
        session.user.barber_shop_id = barber_shop_data.id;
      }

      return session;
    },
    async redirect({ baseUrl }) {
      return `${baseUrl}/dashboard`;
    },
    async jwt({ token, user }) {
      if (user) {
        token.name = user?.name;
        token.role = user?.role;
        token.id = user?.id;
        token.email = user?.email;
      }

      return token;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
