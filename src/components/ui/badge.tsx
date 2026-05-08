import { cn } from "@/lib/utils";

type BadgeVariant =
  | "sale"
  | "rent"
  | "active"
  | "draft"
  | "sold"
  | "rented";

type BadgeProps = {
  variant: BadgeVariant;
  children: React.ReactNode;
  className?: string;
};

const variantStyles: Record<BadgeVariant, string> = {
  sale: "bg-accent text-bg-primary",
  rent: "bg-sage text-text-primary",
  active: "bg-sage-muted text-sage",
  draft: "bg-accent-muted text-accent",
  sold: "bg-rose-muted text-rose",
  rented: "bg-blue-muted text-blue",
};

export function Badge({ variant, children, className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-0.5",
        "text-[0.58rem] font-semibold uppercase tracking-[0.15em]",
        variantStyles[variant],
        className,
      )}
    >
      {children}
    </span>
  );
}
