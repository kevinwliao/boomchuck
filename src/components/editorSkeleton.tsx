import { Skeleton } from "./ui/skeleton";

const n = 16;

export default function EditorSkeleton({
  noAnimation,
}: {
  noAnimation?: boolean;
}) {
  return (
    <div className="m-auto grid w-full grid-cols-4 gap-2 p-4 sm:w-10/12 lg:w-8/12 lg:grid-cols-8">
      {[...Array(n)].map((e, i) => (
        <Skeleton className={`${noAnimation && "animate-none"}`}>
          <div className="group invisible relative box-border select-none rounded-lg  border bg-boomchuck py-4 font-sans text-xl font-semibold md:py-6 md:text-3xl ">
            GM
          </div>
        </Skeleton>
      ))}
    </div>
  );
}
