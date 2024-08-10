import { redirect } from "next/navigation";
import { signIn, auth, providerMap } from "@/auth";
import { AuthError } from "next-auth";
import { Button } from "@/components/ui/button";
import { IconBrandGoogle, IconBrandGithub } from "@tabler/icons-react";
import Logo from "@/components/ui/logo";
import Music from "/public/music.svg";

const AuthIcon = ({ brand }: { brand: string }) => {
  switch (brand) {
    case "GitHub":
      return <IconBrandGithub></IconBrandGithub>;
      break;
    case "Google":
      return <IconBrandGoogle></IconBrandGoogle>;
  }
  return <></>;
};

export default async function Page() {
  return (
    <main className="relative flex w-full grow flex-col items-center justify-center overflow-hidden bg-stone-200 p-2 transition-colors">
      <Music className="absolute z-0 min-h-[80rem] shrink-0 scale-125 fill-stone-500 stroke-stone-500 opacity-0 transition-opacity md:opacity-40"></Music>

      <section
        id="login-card"
        className="z-10 flex w-full flex-col items-center justify-center gap-12 rounded-xl border bg-white px-2 py-20 sm:w-[39.5rem] sm:grow-0 sm:px-48"
      >
        {/* <Logo className="size-28 text-amber-900"></Logo> */}
        <div className="flex flex-col items-center gap-2">
          <h2 className="text-3xl font-semibold">Log In</h2>
          <h3 className="text-lg text-stone-500">Please sign in to continue</h3>
        </div>
        <div className="flex flex-col gap-2">
          {Object.values(providerMap).map((provider) => (
            <form
              action={async () => {
                "use server";
                try {
                  await signIn(provider.id, { callbackUrl: "/" });
                } catch (error) {
                  if (error instanceof AuthError) {
                    // return redirect(`${SIGNIN_ERROR_URL}?error=${error.type}`);
                  }
                  // Otherwise if a redirects happens NextJS can handle it
                  // so you can just re-thrown the error and let NextJS handle it.
                  // Docs:
                  // https://nextjs.org/docs/app/api-reference/functions/redirect#server-component
                  throw error;
                }
              }}
            >
              <Button
                variant="secondary"
                type="submit"
                className="flex items-center gap-2"
              >
                <AuthIcon brand={provider.name}></AuthIcon>
                <span>Sign in with {provider.name}</span>
              </Button>
            </form>
          ))}
        </div>
      </section>
    </main>
  );
}
