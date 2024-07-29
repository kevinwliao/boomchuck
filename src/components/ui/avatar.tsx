import * as Avatar from "@radix-ui/react-avatar";

export default () => (
  <Avatar.Root className="flex size-10 items-center justify-center overflow-hidden rounded-full">
    <Avatar.Image />
    <Avatar.Fallback className="flex h-full w-full items-center justify-center bg-stone-200">
      BC
    </Avatar.Fallback>
  </Avatar.Root>
);
