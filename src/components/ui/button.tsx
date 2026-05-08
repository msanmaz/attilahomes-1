import { cn } from "@/lib/utils";
import { type ButtonHTMLAttributes } from "react";

type ButtonVariant = "primary" | "outline" | "ghost" | "danger";
type ButtonSize = "sm" | "md" | "lg";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
};

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-accent text-bg-primary hover:bg-accent-hover hover:translate-y-[-2px] hover:shadow-[0_8px_30px_rgba(200,165,92,0.2)]",
  outline:
    "bg-transparent text-text-primary border border-border-hover hover:border-accent hover:text-accent",
  ghost: "bg-transparent text-text-muted hover:text-accent",
  danger:
    "bg-transparent text-rose border border-rose-muted hover:bg-rose-muted",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "px-3 py-1.5 text-[0.65rem] tracking-[0.1em]",
  md: "px-6 py-[0.7rem] text-[0.72rem] tracking-[0.12em]",
  lg: "px-8 py-[0.9rem] text-[0.72rem] tracking-[0.18em]",
};

export function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center gap-2 font-body font-medium uppercase",
        "cursor-pointer border-none transition-all duration-400",
        "disabled:opacity-50 disabled:pointer-events-none",
        variantStyles[variant],
        sizeStyles[size],
        className,
      )}
      style={{ transitionTimingFunction: "var(--ease-smooth)" }}
      {...props}
    >
      {children}
    </button>
  );
}
