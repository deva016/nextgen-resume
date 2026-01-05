export default function CheckATSLoading() {
  return (
    <main className="mx-auto w-full max-w-4xl space-y-8 px-6 py-8">
      {/* Header Skeleton */}
      <div className="space-y-3 text-center">
        <div className="mx-auto h-10 w-96 animate-pulse rounded-lg bg-gradient-to-r from-purple-500/30 to-pink-500/30" />
        <div className="mx-auto h-5 w-full max-w-2xl animate-pulse rounded bg-white/10" />
      </div>

      {/* Upload Section Skeleton */}
      <div className="relative overflow-hidden rounded-2xl border-2 border-dashed border-white/20 bg-white/5 p-12 backdrop-blur-xl">
        {/* Shimmer effect */}
        <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/10 to-transparent" />

        <div className="relative flex flex-col items-center gap-6 text-center">
          <div className="h-20 w-20 animate-pulse rounded-full bg-gradient-to-br from-purple-500/20 to-pink-500/20" />
          <div className="space-y-2">
            <div className="mx-auto h-6 w-48 animate-pulse rounded bg-white/20" />
            <div className="mx-auto h-4 w-64 animate-pulse rounded bg-white/10" />
          </div>
          <div className="h-12 w-40 animate-pulse rounded-lg bg-gradient-to-r from-purple-500/30 to-pink-500/30" />
        </div>
      </div>

      {/* Job Description Skeleton */}
      <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
        {/* Shimmer effect */}
        <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/10 to-transparent" />

        <div className="relative space-y-4">
          <div className="h-6 w-64 animate-pulse rounded bg-white/20" />
          <div className="h-32 w-full animate-pulse rounded-lg bg-white/10" />
        </div>
      </div>

      {/* Submit Button Skeleton */}
      <div className="h-12 w-full animate-pulse rounded-lg bg-gradient-to-r from-purple-500/30 to-pink-500/30" />
    </main>
  );
}
