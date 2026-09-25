import React from "react";

export type IconName =
  | "phone"
  | "mail"
  | "email"
  | "map-pin"
  | "mapPin"
  | "message-circle"
  | "message"
  | "clock"
  | "arrow-right"
  | "external-link"
  | "external"
  | "pill"
  | "stethoscope"
  | "syringe"
  | "heart-pulse"
  | "no-smoking"
  | "baby"
  | "x"
  | "close"
  | "menu"
  | "chevron-down"
  | "chevronDown"
  | "alert-triangle"
  | "alert"
  | "check"
  | "badge"
  | "directions"
  | "whatsapp";

type IconProps = React.SVGProps<SVGSVGElement> & {
  name: IconName;
  size?: number;
};

const PATHS: Record<IconName, React.ReactNode> = {
  phone: (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 8.8 19.79 19.79 0 01.11 2.18 2 2 0 012.1 0h3a2 2 0 012 1.72c.127.96.36 1.903.7 2.81a2 2 0 01-.45 2.11L6.17 7.86a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.34 1.85.573 2.81.7A2 2 0 0122 16.92z"
    />
  ),
  mail: (
    <>
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path strokeLinecap="round" strokeLinejoin="round" d="m22 7-8.97 5.7a1.94 1.94 0 01-2.06 0L2 7" />
    </>
  ),
  email: (
    <>
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path strokeLinecap="round" strokeLinejoin="round" d="m22 7-8.97 5.7a1.94 1.94 0 01-2.06 0L2 7" />
    </>
  ),
  "map-pin": (
    <>
      <path strokeLinecap="round" strokeLinejoin="round" d="M20 10c0 6-8 13-8 13s-8-7-8-13a8 8 0 0116 0z" />
      <circle cx="12" cy="10" r="3" />
    </>
  ),
  mapPin: (
    <>
      <path strokeLinecap="round" strokeLinejoin="round" d="M20 10c0 6-8 13-8 13s-8-7-8-13a8 8 0 0116 0z" />
      <circle cx="12" cy="10" r="3" />
    </>
  ),
  "message-circle": (
    <path strokeLinecap="round" strokeLinejoin="round" d="M7.9 20A9 9 0 104 16.1L2 22z" />
  ),
  message: (
    <path strokeLinecap="round" strokeLinejoin="round" d="M7.9 20A9 9 0 104 16.1L2 22z" />
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" strokeLinecap="round" strokeLinejoin="round" />
    </>
  ),
  "arrow-right": (
    <>
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14" />
      <path strokeLinecap="round" strokeLinejoin="round" d="m12 5 7 7-7 7" />
    </>
  ),
  "external-link": (
    <>
      <path strokeLinecap="round" strokeLinejoin="round" d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
      <polyline strokeLinecap="round" strokeLinejoin="round" points="15 3 21 3 21 9" />
      <line strokeLinecap="round" strokeLinejoin="round" x1="10" y1="14" x2="21" y2="3" />
    </>
  ),
  external: (
    <>
      <path strokeLinecap="round" strokeLinejoin="round" d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
      <polyline strokeLinecap="round" strokeLinejoin="round" points="15 3 21 3 21 9" />
      <line strokeLinecap="round" strokeLinejoin="round" x1="10" y1="14" x2="21" y2="3" />
    </>
  ),
  pill: (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M10.5 20H4a2 2 0 01-2-2V4a2 2 0 012-2h3.5a1 1 0 011 1v4.5M15.5 20h4a2 2 0 002-2V4a2 2 0 00-2-2H16a1 1 0 00-1 1v4.5M9 12h6"
    />
  ),
  stethoscope: (
    <>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.8 2.3A.3.3 0 105 2H4a2 2 0 00-2 2v5a6 6 0 006 6v0a6 6 0 006-6V4a2 2 0 00-2-2h-1a.2.2 0 10.3.3" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M8 15v1a6 6 0 006 6v0a6 6 0 006-6v-4" />
      <circle cx="20" cy="10" r="2" />
    </>
  ),
  syringe: (
    <>
      <path strokeLinecap="round" strokeLinejoin="round" d="m18 2 4 4" />
      <path strokeLinecap="round" strokeLinejoin="round" d="m17 7 3-3" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9 8.7 19.3c-1 1-2.5 1-3.4 0l-.6-.6c-1-1-1-2.5 0-3.4L15 5" />
      <path strokeLinecap="round" strokeLinejoin="round" d="m9 11 4 4" />
      <path strokeLinecap="round" strokeLinejoin="round" d="m5 19-3 3" />
      <path strokeLinecap="round" strokeLinejoin="round" d="m14 4 6 6" />
    </>
  ),
  "heart-pulse": (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0016.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 002 8.5c0 2.3 1.5 4.05 3 5.5l7 7 7-7z M3.22 12H9.5l1.5-3 2 4.5 1.5-3h6.28"
    />
  ),
  "no-smoking": (
    <>
      <line strokeLinecap="round" strokeLinejoin="round" x1="2" y1="2" x2="22" y2="22" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 12H3v4h14M20.71 16.71c.18-.21.29-.5.29-.71v-4M17 12V9.5a2.5 2.5 0 000-5" />
    </>
  ),
  baby: (
    <>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h.01M15 12h.01" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 17c0 1.1-1.34 2-3 2s-3-.9-3-2M12 17c0 1.1 1.34 2 3 2s3-.9 3-2" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M8 15v.01M16 15v.01" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M20 8.5C20 5.46 16.42 3 12 3S4 5.46 4 8.5C4 14 7 18 12 18s8-4 8-9.5z" />
    </>
  ),
  x: (
    <>
      <path strokeLinecap="round" strokeLinejoin="round" d="M18 6 6 18" />
      <path strokeLinecap="round" strokeLinejoin="round" d="m6 6 12 12" />
    </>
  ),
  close: (
    <>
      <path strokeLinecap="round" strokeLinejoin="round" d="M18 6 6 18" />
      <path strokeLinecap="round" strokeLinejoin="round" d="m6 6 12 12" />
    </>
  ),
  menu: (
    <>
      <line strokeLinecap="round" strokeLinejoin="round" x1="4" y1="12" x2="20" y2="12" />
      <line strokeLinecap="round" strokeLinejoin="round" x1="4" y1="6"  x2="20" y2="6"  />
      <line strokeLinecap="round" strokeLinejoin="round" x1="4" y1="18" x2="20" y2="18" />
    </>
  ),
  "chevron-down": (
    <path strokeLinecap="round" strokeLinejoin="round" d="m6 9 6 6 6-6" />
  ),
  chevronDown: (
    <path strokeLinecap="round" strokeLinejoin="round" d="m6 9 6 6 6-6" />
  ),
  "alert-triangle": (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M10.29 3.86 1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0zM12 9v4M12 17h.01"
    />
  ),
  alert: (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M10.29 3.86 1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0zM12 9v4M12 17h.01"
    />
  ),
  check: (
    <path strokeLinecap="round" strokeLinejoin="round" d="M20 6 9 17l-5-5" />
  ),
  badge: (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 15l-3.5 2 1-4-3-3 4-.5L12 6l1.5 3.5 4 .5-3 3 1 4z"
    />
  ),
  directions: (
    <>
      <path strokeLinecap="round" strokeLinejoin="round" d="m3 9 9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
      <polyline strokeLinecap="round" strokeLinejoin="round" points="9 22 9 12 15 12 15 22" />
    </>
  ),
  whatsapp: (
    <path
      fill="currentColor"
      stroke="none"
      d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.598 2.664-.698c.969.584 1.961.949 3.19.949 3.182 0 5.768-2.586 5.768-5.766 0-3.18-2.586-5.766-5.768-5.766zm9.969 5.766c0 5.514-4.486 10-10 10-1.823 0-3.539-.493-5.018-1.349l-6.982 1.826 1.862-6.804c-.958-1.547-1.512-3.364-1.512-5.323 0-5.514 4.486-10 10-10s10 4.486 10 10z"
    />
  ),
};

export function Icon({ name, size = 20, className = "", ...props }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      {PATHS[name]}
    </svg>
  );
}
