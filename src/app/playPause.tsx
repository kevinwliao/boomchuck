import { PlayCircleIcon, PauseCircleIcon } from "@heroicons/react/24/solid";
type playPauseProps = React.ComponentPropsWithoutRef<"svg"> & {
  started: boolean;
};

export default function PlayPause({
  className,
  onClick,
  started,
}: playPauseProps) {
  return (
    <>
      {!started ? (
        <PlayCircleIcon
          className={className}
          onClick={onClick}
        ></PlayCircleIcon>
      ) : (
        <PauseCircleIcon
          className={className}
          onClick={onClick}
        ></PauseCircleIcon>
      )}
    </>
  );
}
