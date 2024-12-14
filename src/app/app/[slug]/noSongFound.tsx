import { Button } from "@/components/ui/button";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";

export default function NoSongFound() {
  return (
    <main className="flex grow flex-col items-center justify-center text-center">
      <div className="flex items-center pb-20">
        <span className="px-4">No song found.</span>
        <Button variant="secondary" asChild>
          <Link href="/">Make one!</Link>
        </Button>
      </div>
    </main>
  );
}
