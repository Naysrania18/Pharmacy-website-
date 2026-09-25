import type { ReactNode } from "react";

/** Re-mounts on every navigation, so each page fades in. */
export default function Template({ children }: { children: ReactNode }) {
  return <div className="page-in flex flex-1 flex-col">{children}</div>;
}
