import Link from "next/link";
import { Button } from "@/components/ui/button";
export default function NotFound() {
  return (
    <div className="flex h-screen flex-col items-center justify-center text-center">
      <div className="flex items-center pb-20">
        <span className="text-bold border-r border-slate-200 px-4 text-2xl">
          404
        </span>
        <span className="px-4">This page could not be found.</span>
        <Link href="/">
          <Button variant="outline" className="">
            Take me home!
          </Button>
        </Link>
      </div>
    </div>
  );
}
