import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function Footer() {
  return (
    <footer className=" border-t p-4">
      <div className="flex items-center justify-center text-sm">
        <div className="text-muted-foreground">
          Built by{" "}
          <a
            className="font-medium underline underline-offset-4"
            href="https://github.com/kevinwliao"
            target="_blank"
            rel="noopener noreferrer"
          >
            Kevin Liao
          </a>
          .{" "}
          <Dialog>
            <DialogTrigger asChild>
              <button className="font-medium underline underline-offset-4">
                Sound Attributions
              </button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle className="text-2xl">
                  Sound Attributions
                </DialogTitle>
              </DialogHeader>
              <div className="text-muted-foreground">
                <p className="leading-7 [&:not(:first-child)]:mt-2">
                  Double bass:{" "}
                  <a
                    className="font-medium underline underline-offset-4"
                    href="https://freesound.org/people/Carlos_Vaquero/packs/9528/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Carlos Vaquero
                  </a>
                </p>
                <p className="leading-7 [&:not(:first-child)]:mt-2">
                  Guitar:{" "}
                  <a
                    className="font-medium underline underline-offset-4"
                    href="https://github.com/nbrosowsky/tonejs-instruments"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Nicholaus Brosowsky
                  </a>
                </p>
              </div>
            </DialogContent>
          </Dialog>
          .
        </div>
      </div>
    </footer>
  );
}
