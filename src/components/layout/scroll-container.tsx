"use client";

import { useRef, useEffect } from "react";
import { usePathname } from "next/navigation";

export function ScrollContainer({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  // Reset scroll to top on every route change
  useEffect(() => {
    ref.current?.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname]);

  return (
    <div
      ref={ref}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        overflowY: "scroll",
        overflowX: "hidden",
        overscrollBehavior: "none",
        WebkitOverflowScrolling: "auto",
        zIndex: 0,
      }}
    >
      {children}
    </div>
  );
}
