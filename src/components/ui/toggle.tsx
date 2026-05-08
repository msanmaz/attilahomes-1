"use client";

import { cn } from "@/lib/utils";

type ToggleProps = {
  checked: boolean;
  onChange: (checked: boolean) => void;
  className?: string;
};

export function Toggle({ checked, onChange, className }: ToggleProps) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className={cn(
        "relative w-10 h-[22px] rounded-full border transition-all duration-300 flex-shrink-0 cursor-pointer",
        checked
          ? "bg-accent border-accent"
          : "bg-bg-primary border-text-muted",
        className,
      )}
    >
      <span
        className={cn(
          "absolute top-[2px] w-4 h-4 rounded-full transition-all duration-300",
          checked
            ? "left-5 bg-bg-primary"
            : "left-[2px] bg-text-muted",
        )}
        style={{ transitionTimingFunction: "var(--ease-smooth)" }}
      />
    </button>
  );
}
