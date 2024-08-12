import { Button } from "@/components/ui/button";
import { signInAction, signOutAction } from "@/lib/actions";
import { auth, signIn, signOut } from "@/auth";
import Link from "next/link";

export async function SignInButton() {
  const session = await auth();
  return (
    <>
      {!session ? (
        <form
          action={async () => {
            "use server";
            await signIn();
          }}
        >
          <Button type="submit">Log In</Button>
        </form>
      ) : (
        <form
          action={async () => {
            "use server";
            await signOut();
          }}
        >
          <Button type="submit" variant="secondary">
            Log Out
          </Button>
        </form>
      )}
    </>
  );

  // return (
  //   <>
  //     {!session ? (
  //       <Link href="/signin">
  //         <Button type="button">Log In</Button>
  //       </Link>
  //     ) : (
  //       <form
  //         action={async () => {
  //           "use server";
  //           await signOut();
  //         }}
  //       >
  //         <Button type="submit">Log Out</Button>
  //       </form>
  //     )}
  //   </>
  // );
}
