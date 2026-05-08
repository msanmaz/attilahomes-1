import { cn } from "@/lib/utils";

type SkeletonProps = {
  className?: string;
};

export function Skeleton({ className }: SkeletonProps) {
  return (
    <div
      className={cn(
        "bg-bg-card animate-pulse rounded-none",
        className,
      )}
    />
  );
}

export function SkeletonText({ className }: SkeletonProps) {
  return <Skeleton className={cn("h-3 w-full", className)} />;
}

export function SkeletonCard({ className }: SkeletonProps) {
  return (
    <div className={cn("bg-bg-card border border-border", className)}>
      <Skeleton className="aspect-[16/11] w-full" />
      <div className="p-5 space-y-3">
        <SkeletonText className="w-1/3 h-2" />
        <SkeletonText className="w-3/4 h-4" />
        <div className="flex gap-3">
          <SkeletonText className="w-12 h-2" />
          <SkeletonText className="w-12 h-2" />
          <SkeletonText className="w-16 h-2" />
        </div>
        <div className="flex justify-between items-center pt-3 border-t border-border">
          <SkeletonText className="w-20 h-5" />
          <Skeleton className="w-8 h-8 rounded-full" />
        </div>
      </div>
    </div>
  );
}

export function SkeletonAvatar({ className }: SkeletonProps) {
  return <Skeleton className={cn("w-10 h-10 rounded-full", className)} />;
}
