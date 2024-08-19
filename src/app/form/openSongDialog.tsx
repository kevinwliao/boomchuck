"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import * as React from "react";
import { IconFolderOpen } from "@tabler/icons-react";
import SongSelection from "@/components/songSelection";
import { Song } from "@/lib/schemas";
import { SelectSongForm } from "@/app/form/selectSongForm";

type OpenSongDialogProps = { songs: Song[] };
const OpenSongDialog = React.forwardRef<HTMLElement, OpenSongDialogProps>(
  ({ songs, ...props }, ref) => {
    const [open, setOpen] = React.useState(false);
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <button className="flex w-max items-center gap-2 text-sm uppercase text-stone-500 hover:text-stone-600">
            <IconFolderOpen />
            <div>Open Song</div>
          </button>
        </DialogTrigger>
        <DialogContent className="shadow-none sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="text-2xl font-medium">
              Open Song
            </DialogTitle>
          </DialogHeader>
          <SelectSongForm songs={songs} openHandler={setOpen}></SelectSongForm>
        </DialogContent>
      </Dialog>
    );
  },
);
OpenSongDialog.displayName = "OpenSongDialog";

export default OpenSongDialog;
