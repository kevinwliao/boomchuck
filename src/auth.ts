import NextAuth, { DefaultSession } from "next-auth";
import Google from "next-auth/providers/google";
import type { Provider } from "next-auth/providers";

const providers: Provider[] = [Google];

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
    } & DefaultSession["user"];
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers,
  callbacks: {
    jwt({ token, user, account }) {
      if (user) {
        // User is available during sign-in
        token.id = account?.providerAccountId;
      }
      return token;
    },
    session({ session, token }) {
      session.user.id = token.id as string;
      return session;
    },
  },
  // callbacks: {
  //   async session({ session, user }) {
  //     session.user.id = user.id;
  //     return session;
  //   },
  // },
  // pages: {
  //   signIn: "/signin",
  // },
});

export const providerMap = providers.map((provider) => {
  if (typeof provider === "function") {
    const providerData = provider();
    return { id: providerData.id, name: providerData.name };
  } else {
    return { id: provider.id, name: provider.name };
  }
});
