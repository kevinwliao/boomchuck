import * as React from "react";
import { SVGAttributes } from "react";
export default function Logo({
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
        fill-rule="evenodd"
        clip-rule="evenodd"
        fill="currentColor"
        d="M9.56962 23.7537C4.10739 22.6302 0 17.7948 0 12C0 5.37258 5.37258 0 12 0C18.6274 0 24 5.37258 24 12C24 17.7948 19.8926 22.6302 14.4304 23.7537V18.6076C14.4304 18.5682 14.4294 18.5289 14.4276 18.49C15.2646 17.7934 15.7975 16.7437 15.7975 15.5696V7.45628C15.7975 5.85003 14.7765 4.40446 13.2713 3.8437C12.4113 3.52328 11.4514 3.52506 10.5956 3.85688C9.15313 4.41621 8.20253 5.80437 8.20253 7.35151V15.5696C8.20253 16.7437 8.73537 17.7934 9.57242 18.49C9.57056 18.5289 9.56962 18.5682 9.56962 18.6076V23.7537ZM6.98734 7.82279C6.98734 8.49392 6.44328 9.03798 5.77215 9.03798C5.10102 9.03798 4.55696 8.49392 4.55696 7.82279C4.55696 7.15165 5.10102 6.6076 5.77215 6.6076C6.44328 6.6076 6.98734 7.15165 6.98734 7.82279ZM5.77215 13.1392C6.44328 13.1392 6.98734 12.5952 6.98734 11.9241C6.98734 11.2529 6.44328 10.7089 5.77215 10.7089C5.10102 10.7089 4.55696 11.2529 4.55696 11.9241C4.55696 12.5952 5.10102 13.1392 5.77215 13.1392ZM6.98734 16.3291C6.98734 17.0002 6.44328 17.5443 5.77215 17.5443C5.10102 17.5443 4.55696 17.0002 4.55696 16.3291C4.55696 15.658 5.10102 15.1139 5.77215 15.1139C6.44328 15.1139 6.98734 15.658 6.98734 16.3291ZM18.2278 9.03798C18.899 9.03798 19.443 8.49392 19.443 7.82279C19.443 7.15165 18.899 6.6076 18.2278 6.6076C17.5567 6.6076 17.0127 7.15165 17.0127 7.82279C17.0127 8.49392 17.5567 9.03798 18.2278 9.03798ZM19.443 11.9241C19.443 12.5952 18.899 13.1392 18.2278 13.1392C17.5567 13.1392 17.0127 12.5952 17.0127 11.9241C17.0127 11.2529 17.5567 10.7089 18.2278 10.7089C18.899 10.7089 19.443 11.2529 19.443 11.9241ZM18.2278 17.5443C18.899 17.5443 19.443 17.0002 19.443 16.3291C19.443 15.658 18.899 15.1139 18.2278 15.1139C17.5567 15.1139 17.0127 15.658 17.0127 16.3291C17.0127 17.0002 17.5567 17.5443 18.2278 17.5443Z"
      />
    </svg>
  );
}