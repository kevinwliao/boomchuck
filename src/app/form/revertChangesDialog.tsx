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
import { IconArrowBack } from "@tabler/icons-react";
import { Song } from "@/lib/schemas";
import { SelectSongForm } from "@/app/form/selectSongForm";
import { Button } from "@/components/ui/button";

type RevertChangesDialogProps = { revertChanges: () => void };
const RevertChangesDialog = React.forwardRef<
  HTMLElement,
  RevertChangesDialogProps
>(({ revertChanges, ...props }, ref) => {
  const [open, setOpen] = React.useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="flex w-max items-center gap-2 text-sm uppercase text-stone-500 hover:text-stone-600">
          <IconArrowBack />
          <div>Revert Changes</div>
        </button>
      </DialogTrigger>
      <DialogContent className="shadow-none sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-medium">
            Revert Changes
          </DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-6">
          <div className="text-sm">
            Are you sure you want to revert changes?
          </div>
          <div className="flex justify-end gap-2">
            <DialogClose>
              <Button variant="secondary">Cancel</Button>
            </DialogClose>
            <DialogClose>
              <Button variant="destructive" onClick={revertChanges}>
                Revert
              </Button>
            </DialogClose>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
});
RevertChangesDialog.displayName = "RevertChangesDialog";

export default RevertChangesDialog;
