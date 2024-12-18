import * as React from "react";
import { SVGAttributes } from "react";
export default function LogoIcon({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"svg">) {
  return (
    <svg
      className={className}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        fill="currentColor"
        d="M61.0063 151.43C26.1846 144.267 0 113.442 0 76.5C0 34.2502 34.2502 0 76.5 0C118.75 0 153 34.2502 153 76.5C153 113.442 126.815 144.267 91.9937 151.43V123.01C97.0242 121.582 100.709 116.954 100.709 111.465V38.8383C100.709 33.8267 97.5944 29.3429 92.8982 27.5933L80.2904 22.8963C77.5368 21.8704 74.5025 21.8906 71.7628 22.9529L59.9528 27.5323C55.3346 29.3231 52.2911 33.7674 52.2911 38.7207V111.465C52.2911 116.954 55.9758 121.582 61.0063 123.01V151.43ZM44.5443 49.8703C44.5443 54.1487 41.0759 57.6171 36.7975 57.6171C32.519 57.6171 29.0506 54.1487 29.0506 49.8703C29.0506 45.5918 32.519 42.1234 36.7975 42.1234C41.0759 42.1234 44.5443 45.5918 44.5443 49.8703ZM36.7975 83.7627C41.0759 83.7627 44.5443 80.2943 44.5443 76.0158C44.5443 71.7374 41.0759 68.269 36.7975 68.269C32.519 68.269 29.0506 71.7374 29.0506 76.0158C29.0506 80.2943 32.519 83.7627 36.7975 83.7627ZM44.5443 104.098C44.5443 108.377 41.0759 111.845 36.7975 111.845C32.519 111.845 29.0506 108.377 29.0506 104.098C29.0506 99.8196 32.519 96.3513 36.7975 96.3513C41.0759 96.3513 44.5443 99.8196 44.5443 104.098ZM116.203 57.6171C120.481 57.6171 123.949 54.1487 123.949 49.8703C123.949 45.5918 120.481 42.1234 116.203 42.1234C111.924 42.1234 108.456 45.5918 108.456 49.8703C108.456 54.1487 111.924 57.6171 116.203 57.6171ZM123.949 76.0158C123.949 80.2943 120.481 83.7627 116.203 83.7627C111.924 83.7627 108.456 80.2943 108.456 76.0158C108.456 71.7374 111.924 68.269 116.203 68.269C120.481 68.269 123.949 71.7374 123.949 76.0158ZM116.203 111.845C120.481 111.845 123.949 108.377 123.949 104.098C123.949 99.8196 120.481 96.3513 116.203 96.3513C111.924 96.3513 108.456 99.8196 108.456 104.098C108.456 108.377 111.924 111.845 116.203 111.845Z"
      />
    </svg>
  );
}
