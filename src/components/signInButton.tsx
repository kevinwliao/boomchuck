import { Button } from "@/components/ui/button";
import { signInAction, signOutAction } from "@/lib/actions";
import { auth } from "@/auth";

export async function SignInButton() {
  const session = await auth();
  return (
    <>
      {!session ? (
        <form action={signInAction}>
          <Button type="submit">Log In</Button>
        </form>
      ) : (
        <form action={signOutAction}>
          <Button type="submit">Log Out</Button>
        </form>
      )}
    </>
  );
}
