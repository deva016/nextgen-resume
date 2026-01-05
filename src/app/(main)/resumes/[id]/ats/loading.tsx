export default function ATSLoading() {
  return (
    <main className="mx-auto w-full max-w-6xl space-y-8 px-6 py-8">
      {/* Header Skeleton */}
      <div className="space-y-3">
        <div className="h-10 w-80 animate-pulse rounded-lg bg-gradient-to-r from-purple-500/30 to-pink-500/30" />
        <div className="h-5 w-full max-w-2xl animate-pulse rounded bg-white/10" />
      </div>

      {/* Score Gauge Skeleton */}
      <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl">
        {/* Shimmer effect */}
        <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/10 to-transparent" />

        <div className="relative flex flex-col items-center gap-6">
          <div className="h-48 w-48 animate-pulse rounded-full bg-gradient-to-br from-purple-500/20 to-pink-500/20" />
          <div className="space-y-2 text-center">
            <div className="mx-auto h-12 w-32 animate-pulse rounded-lg bg-gradient-to-r from-purple-500/30 to-pink-500/30" />
            <div className="mx-auto h-5 w-48 animate-pulse rounded bg-white/10" />
          </div>
        </div>
      </div>

      {/* Score Breakdown Skeleton */}
      <div className="grid gap-6 md:grid-cols-3">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl"
          >
            {/* Shimmer effect */}
            <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/10 to-transparent" />

            <div className="relative space-y-3">
              <div className="h-5 w-32 animate-pulse rounded bg-white/20" />
              <div className="h-10 w-20 animate-pulse rounded-lg bg-gradient-to-r from-purple-500/30 to-pink-500/30" />
              <div className="h-4 w-full animate-pulse rounded bg-white/10" />
            </div>
          </div>
        ))}
      </div>

      {/* Suggestions Skeleton */}
      <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl">
        {/* Shimmer effect */}
        <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/10 to-transparent" />

        <div className="relative space-y-6">
          <div className="h-7 w-64 animate-pulse rounded-lg bg-white/20" />
          
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex gap-3">
                <div className="h-6 w-6 flex-shrink-0 animate-pulse rounded-full bg-gradient-to-br from-purple-500/30 to-pink-500/30" />
                <div className="flex-1 space-y-2">
                  <div className="h-4 w-full animate-pulse rounded bg-white/15" />
                  <div className="h-4 w-3/4 animate-pulse rounded bg-white/10" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
