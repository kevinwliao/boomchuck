import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Info } from "lucide-react";
import * as React from "react";

export const AboutDialog = React.forwardRef<HTMLElement>((props, ref) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" className="w-full justify-start">
          {/* <Info className="size-[1.2rem]"></Info> */}
          About
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-2xl">About BoomChuck</DialogTitle>
        </DialogHeader>
        <div className="text-muted-foreground">
          <p className="leading-7 [&:not(:first-child)]:mt-2">
            Named after the "boom-chuck" of a bluegrass rhythm section,
            BoomChuck is a free tool created to help musicians practice with
            accompaniment.
          </p>
          <p className="leading-7 [&:not(:first-child)]:mt-2">
            Load a song, or build your own. You can enter chords with the chord
            builder, or add them to your palette for reuse. Drag and drop to
            rearrange.
          </p>
          <p className="leading-7 [&:not(:first-child)]:mt-2">Happy jamming!</p>
        </div>
      </DialogContent>
    </Dialog>
  );
});
