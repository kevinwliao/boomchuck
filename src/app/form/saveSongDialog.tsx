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

type SaveSongDialogProps = { measures: Measure[]; name?: string };

const SaveSongDialog = React.forwardRef<HTMLElement, SaveSongDialogProps>(
  ({ measures, name, ...props }, ref) => {
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
          <SongForm
            measures={measures}
            openHandler={setOpen}
            currentName={name}
          ></SongForm>
        </DialogContent>
      </Dialog>
    );
  },
);
SaveSongDialog.displayName = "SaveSongDialog";

export default SaveSongDialog;
