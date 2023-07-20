import NextAuth, { type NextAuthOptions, Session } from "next-auth";
import { JWT } from "next-auth/jwt";
import CredentialsProvider from "next-auth/providers/credentials";
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

      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.name = user?.name;
        token.role = user?.role;
        token.id = user?.id;
      }

      return token;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
