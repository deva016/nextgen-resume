export default function ResumesLoading() {
  return (
    <main className="mx-auto w-full max-w-7xl space-y-8 px-6 py-8">
      {/* Header Section Skeleton */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="space-y-2">
          <div className="h-6 w-40 animate-pulse rounded-full bg-purple-500/20" />
          <div className="h-9 w-64 animate-pulse rounded-lg bg-gradient-to-r from-white/20 to-gray-300/20" />
          <div className="h-5 w-96 animate-pulse rounded bg-white/10" />
        </div>
        <div className="h-11 w-36 animate-pulse rounded-lg bg-gradient-to-r from-purple-500/30 to-pink-500/30" />
      </div>

      {/* Resume Grid Skeleton */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div
            key={i}
            className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl transition-all"
          >
            {/* Shimmer effect */}
            <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/10 to-transparent" />

            <div className="relative space-y-4 p-6">
              {/* Preview skeleton */}
              <div className="aspect-[8.5/11] w-full animate-pulse rounded-lg bg-white/10" />
              
              {/* Title & actions */}
              <div className="space-y-2">
                <div className="h-5 w-3/4 animate-pulse rounded bg-white/20" />
                <div className="h-4 w-1/2 animate-pulse rounded bg-white/10" />
              </div>

              {/* Action buttons */}
              <div className="flex gap-2">
                <div className="h-9 flex-1 animate-pulse rounded-lg bg-white/10" />
                <div className="h-9 w-9 animate-pulse rounded-lg bg-white/10" />
                <div className="h-9 w-9 animate-pulse rounded-lg bg-white/10" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
