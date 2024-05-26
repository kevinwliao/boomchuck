import { PlayCircleIcon, StopCircleIcon } from "@heroicons/react/24/solid";

type playStopProps = React.ComponentPropsWithoutRef<"svg"> & {
  started: boolean;
};

export default function PlayStop({
  className,
  onClick,
  started,
}: playStopProps) {
  return (
    <>
      {!started ? (
        <PlayCircleIcon
          className={className}
          onClick={onClick}
        ></PlayCircleIcon>
      ) : (
        <StopCircleIcon
          className={className}
          onClick={onClick}
        ></StopCircleIcon>
      )}
    </>
  );
}
