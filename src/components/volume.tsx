// import { Slider } from "@/components/ui/slider";
import { Volume1, Volume2, VolumeIcon, VolumeX } from "lucide-react";
import {
  IconVolumeOff,
  IconVolume,
  IconVolume2,
  IconVolume3,
} from "@tabler/icons-react";
import * as Slider from "@radix-ui/react-slider";

export default function Volume({
  onValueChange,
  volume,
}: {
  onValueChange: (value: number[]) => void;
  volume: number;
}) {
  let currentVolumeIcon;

  if (volume === 0) {
    currentVolumeIcon = <IconVolume3></IconVolume3>;
  } else if (volume < 0.5) {
    currentVolumeIcon = <IconVolume2></IconVolume2>;
  } else {
    currentVolumeIcon = <IconVolume></IconVolume>;
  }

  return (
    <div className="flex w-32 items-center gap-2">
      <div>{currentVolumeIcon}</div>
      <Slider.Root
        value={[volume]}
        min={0}
        max={1}
        step={0.01}
        onValueChange={onValueChange}
        className="relative flex w-full touch-none select-none items-center"
      >
        <Slider.Track className="relative h-2 w-full grow overflow-hidden rounded-full bg-secondary">
          <Slider.Range className="absolute h-full bg-primary" />
        </Slider.Track>
        <Slider.Thumb className="block h-5 w-5 rounded-full border-2 border-primary bg-background ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50" />
      </Slider.Root>
    </div>
  );
}
