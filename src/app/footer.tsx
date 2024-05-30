import Socials from "@/components/socials";
export default function Footer() {
  return (
    <footer className="border-t p-4">
      <div className="flex items-center justify-center text-sm">
        <div className="text-muted-foreground">
          Built by{" "}
          <a
            className="font-medium underline underline-offset-4"
            href="https://github.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Kevin Liao
          </a>
          . Send{" "}
          <a
            className="font-medium underline underline-offset-4"
            href="https://github.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            feedback
          </a>
          .
        </div>
      </div>
    </footer>
  );
}
