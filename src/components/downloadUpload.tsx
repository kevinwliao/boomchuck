import { Button } from "./ui/button";
import { SaveIcon } from "lucide-react";
import { UploadIcon } from "lucide-react";

export default function DownloadUpload() {
  return (
    <footer className="flex max-w-max gap-2 rounded-md border bg-background p-2 ">
      <Button variant="ghost">
        <SaveIcon />
      </Button>
      <Button variant="ghost">
        <UploadIcon />
      </Button>
    </footer>
  );
}
