import { Slider } from "@/components/ui/slider";
import { Volume1, Volume2, VolumeIcon, VolumeX } from "lucide-react";

export default function Volume({
  onValueChange,
  volume,
}: {
  onValueChange: (value: number[]) => void;
  volume: number;
}) {
  let currentVolumeIcon;

  if (volume === 0) {
    currentVolumeIcon = <VolumeX className="size-9"></VolumeX>;
  } else if (volume < 0.33) {
    currentVolumeIcon = <VolumeIcon className="size-9"></VolumeIcon>;
  } else if (volume < 0.67) {
    currentVolumeIcon = <Volume1 className="size-9"></Volume1>;
  } else {
    currentVolumeIcon = <Volume2 className="size-9"></Volume2>;
  }

  return (
    <div className="flex w-32 items-center gap-2">
      {currentVolumeIcon}
      <Slider
        value={[volume]}
        min={0}
        max={1}
        step={0.001}
        onValueChange={onValueChange}
      />
      {/* <Volume2 className="size-10"></Volume2> */}
    </div>
  );
}
