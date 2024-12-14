import NextAuth, { DefaultSession } from "next-auth";
import Google from "next-auth/providers/google";
import type { Provider } from "next-auth/providers";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { db } from "@/schema";
export * from "@/auth.config";
import authConfig from "@/auth.config";

const providers: Provider[] = [Google];

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: DrizzleAdapter(db),
  // providers,
  // // callbacks: {
  // //   jwt({ token, user, account }) {
  // //     if (user) {
  // //       // User is available during sign-in
  // //       token.id = account?.providerAccountId;
  // //     }
  // //     return token;
  // //   },
  // //   session({ session, token }) {
  // //     session.user.id = token.id as string;
  // //     return session;
  // //   },
  // // },
  // callbacks: {
  //   async session({ session, user }) {
  //     session.user.id = user.id;
  //     return session;
  //   },
  // },
  // pages: {
  //   signIn: "/signin",
  // },
  ...authConfig,
});

// export const providerMap = providers.map((provider) => {
//   if (typeof provider === "function") {
//     const providerData = provider();
//     return { id: providerData.id, name: providerData.name };
//   } else {
//     return { id: provider.id, name: provider.name };
//   }
// });
