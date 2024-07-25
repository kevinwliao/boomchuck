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

const SaveSongDialog = React.forwardRef<HTMLElement>((props, ref) => {
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
        <SongForm></SongForm>
      </DialogContent>
    </Dialog>
  );
});
SaveSongDialog.displayName = "SaveSongDialog";

export default SaveSongDialog;
