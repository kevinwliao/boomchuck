import { ArrowUp } from "lucide-react";
export default function EditorEmpty() {
  return (
    <div className="m-auto flex w-full flex-col items-center justify-center p-4 py-8 text-muted-foreground sm:w-10/12 lg:w-8/12 lg:grid-cols-8">
      <ArrowUp className="animate-bounce"></ArrowUp>
      <div className="text-sm font-medium">Add your first chord!</div>
    </div>
  );
}
