"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import * as React from "react";
import SongForm from "@/app/form/songForm";
import { Measure } from "@/lib/schemas";
import { IconDeviceFloppy } from "@tabler/icons-react";
import { Session } from "next-auth";
import { signInAction } from "@/lib/actions";

type SaveSongDialogProps = {
  measures: Measure[];
  name?: string;
  session: Session | null;
};

const SaveSongDialog = React.forwardRef<HTMLElement, SaveSongDialogProps>(
  ({ measures, name, session, ...props }, ref) => {
    const [open, setOpen] = React.useState(false);
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <button className="flex w-max items-center gap-2 text-sm uppercase text-stone-500 hover:text-stone-600">
            <IconDeviceFloppy />
            <div>Save song</div>
          </button>
        </DialogTrigger>
        <DialogContent className="shadow-none sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="text-2xl font-medium">
              Save Song
            </DialogTitle>
          </DialogHeader>
          {session ? (
            <SongForm
              measures={measures}
              openHandler={setOpen}
              currentName={name}
            ></SongForm>
          ) : (
            <div className="space-y-6">
              <div>Log in to save your song.</div>
              <div className="flex justify-end gap-2">
                <Button variant="secondary">Close</Button>
                <form action={signInAction}>
                  <Button>Log In</Button>
                </form>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    );
  },
);
SaveSongDialog.displayName = "SaveSongDialog";

export default SaveSongDialog;
