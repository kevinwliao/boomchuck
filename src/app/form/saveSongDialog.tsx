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

type SaveSongDialogProps = { measures: Measure[] };

const SaveSongDialog = React.forwardRef<HTMLElement, SaveSongDialogProps>(
  ({ measures, ...props }, ref) => {
    const [open, setOpen] = React.useState(false);
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="ghost">Save Song</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="text-2xl">Save Song</DialogTitle>
          </DialogHeader>
          <SongForm measures={measures} openHandler={setOpen}></SongForm>
        </DialogContent>
      </Dialog>
    );
  },
);
SaveSongDialog.displayName = "SaveSongDialog";

export default SaveSongDialog;
