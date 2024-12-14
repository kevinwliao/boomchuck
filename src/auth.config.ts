import Google from "next-auth/providers/google";
import Github from "next-auth/providers/github";
import type { NextAuthConfig } from "next-auth";
import type { Provider } from "next-auth/providers";

const providers: Provider[] = [
  Google({ allowDangerousEmailAccountLinking: true }),
  Github({ allowDangerousEmailAccountLinking: true }),
];

export default {
  providers,
  trustHost: true,
  session: { strategy: "database" },
} satisfies NextAuthConfig;

export const providerMap = providers.map((provider) => {
  if (typeof provider === "function") {
    const providerData = provider();
    return { id: providerData.id, name: providerData.name };
  } else {
    return { id: provider.id, name: provider.name };
  }
});
