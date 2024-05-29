import { PlayCircleIcon, StopCircleIcon } from "@heroicons/react/24/solid";

type playStopProps = React.ComponentPropsWithoutRef<"button"> & {
  started: boolean;
  disabled: boolean;
};

export default function PlayStop({
  className,
  onClick,
  started,
  disabled,
}: playStopProps) {
  return (
    <button className={className} onClick={onClick} disabled={disabled}>
      {!started ? (
        <PlayCircleIcon></PlayCircleIcon>
      ) : (
        <StopCircleIcon></StopCircleIcon>
      )}
    </button>
  );
}
