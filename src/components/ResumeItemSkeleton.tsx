import { Skeleton } from "./ui/skeleton";

export default function ResumeItemSkeleton() {
  return (
    <div className="group relative rounded-2xl border border-white/10 bg-white/5 p-3 backdrop-blur-sm">
      <div className="space-y-3">
        {/* Title and description section */}
        <div className="space-y-2">
          <Skeleton className="h-5 w-3/4 mx-auto" />
          <Skeleton className="h-4 w-2/3 mx-auto" />
          <Skeleton className="h-3 w-1/2 mx-auto" />
        </div>

        {/* Resume Preview Placeholder */}
        <div className="relative">
          <div className="overflow-hidden rounded-lg border border-white/5 bg-white/5 shadow-sm">
            {/* Mimicking a resume document */}
            <div className="aspect-[1/1.4142] p-4 space-y-2">
              <Skeleton className="h-3 w-full" />
              <Skeleton className="h-3 w-5/6" />
              <Skeleton className="h-2 w-0" />
              <Skeleton className="h-2 w-3/4" />
              <Skeleton className="h-2 w-4/5" />
              <Skeleton className="h-2 w-2/3" />
              <Skeleton className="h-2 w-0" />
              <Skeleton className="h-2 w-5/6" />
              <Skeleton className="h-2 w-3/4" />
            </div>
          </div>
          {/* Gradient overlay */}
          <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#0a0a0f] to-transparent" />
        </div>
      </div>
    </div>
  );
}
