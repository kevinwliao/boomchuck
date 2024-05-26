import { buttonVariants } from "./ui/button";
import { FaGithub } from "react-icons/fa";

export default function Socials() {
  return (
    <div>
      <a
        className={buttonVariants({ variant: "ghost", size: "icon" })}
        href="https://github.com/"
        target="_blank"
        rel="noopener noreferrer"
      >
        <FaGithub className="size-[1.2rem]"></FaGithub>
      </a>
    </div>
  );
}
