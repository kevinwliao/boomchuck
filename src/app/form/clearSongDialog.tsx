"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import * as React from "react";
import { IconTrashX } from "@tabler/icons-react";
import { Song } from "@/lib/schemas";
import { SelectSongForm } from "@/app/form/selectSongForm";
import { Button } from "@/components/ui/button";

type ClearSongDialogProps = { clearMeasures: () => void };
const ClearSongDialog = React.forwardRef<HTMLElement, ClearSongDialogProps>(
  ({ clearMeasures, ...props }, ref) => {
    const [open, setOpen] = React.useState(false);
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <button className="flex w-max items-center gap-2 text-sm uppercase text-stone-500 hover:text-stone-600">
            <IconTrashX />
            <div>Delete Measures</div>
          </button>
        </DialogTrigger>
        <DialogContent className="shadow-none sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="text-2xl font-medium">
              Delete Measures
            </DialogTitle>
          </DialogHeader>
          <div className="flex flex-col gap-2">
            <div className="">
              Are you sure you want to delete all measures? This action cannot
              be undone.
            </div>
            <div className="flex justify-end gap-2">
              <DialogClose>
                <Button variant="secondary">Cancel</Button>
              </DialogClose>
              <DialogClose>
                <Button variant="destructive" onClick={clearMeasures}>
                  Delete
                </Button>
              </DialogClose>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  },
);
ClearSongDialog.displayName = "ClearSongDialog";

export default ClearSongDialog;
