export default function DashboardLoading() {
  return (
    <main className="mx-auto w-full max-w-7xl space-y-8 px-4 py-8">
      {/* Page Header Skeleton */}
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <div className="h-10 w-64 animate-pulse rounded-lg bg-gradient-to-r from-purple-500/20 to-pink-500/20" />
          <div className="h-4 w-96 animate-pulse rounded bg-white/10" />
        </div>
        <div className="h-12 w-40 animate-pulse rounded-lg bg-white/10" />
      </div>

      {/* Stats Cards Skeleton */}
      <div className="grid gap-6 md:grid-cols-2">
        {[1, 2].map((i) => (
          <div
            key={i}
            className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl"
          >
            {/* Shimmer effect */}
            <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
            
            <div className="relative space-y-4">
              <div className="h-4 w-32 animate-pulse rounded bg-white/20" />
              <div className="h-8 w-24 animate-pulse rounded-lg bg-gradient-to-r from-purple-500/30 to-pink-500/30" />
              <div className="h-3 w-40 animate-pulse rounded bg-white/20" />
            </div>
          </div>
        ))}
      </div>

      {/* Recent Resumes Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="h-8 w-48 animate-pulse rounded-lg bg-white/20" />
        </div>

        {/* Resume Cards Skeleton */}
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="relative overflow-hidden rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur-xl"
            >
              {/* Shimmer effect */}
              <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
              
              <div className="relative flex items-center justify-between gap-4">
                <div className="flex-1 space-y-3">
                  <div className="h-5 w-64 animate-pulse rounded bg-white/20" />
                  <div className="h-3 w-40 animate-pulse rounded bg-white/10" />
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-8 w-20 animate-pulse rounded-lg bg-white/20" />
                  <div className="h-8 w-8 animate-pulse rounded-lg bg-white/10" />
                  <div className="h-8 w-8 animate-pulse rounded-lg bg-white/10" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions Skeleton */}
      <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
        <div className="mb-4 h-6 w-32 animate-pulse rounded bg-white/20" />
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="h-12 animate-pulse rounded-lg bg-white/10" />
          <div className="h-12 animate-pulse rounded-lg bg-white/10" />
        </div>
      </div>
    </main>
  );
}
