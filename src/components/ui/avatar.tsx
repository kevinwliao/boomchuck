import { auth } from "@/auth";
import * as AvatarPrimitive from "@radix-ui/react-avatar";

export default async function Avatar() {
  const session = await auth();

  if (!session) return <></>;

  return (
    <AvatarPrimitive.Root className="flex size-11 items-center justify-center overflow-hidden rounded-full">
      <AvatarPrimitive.Image src={session?.user?.image || undefined} />
      <AvatarPrimitive.Fallback className="flex h-full w-full items-center justify-center bg-stone-200">
        {session?.user?.name?.split(" ").map((part) => part.at(0)) || "BC"}
      </AvatarPrimitive.Fallback>
    </AvatarPrimitive.Root>
  );
}
