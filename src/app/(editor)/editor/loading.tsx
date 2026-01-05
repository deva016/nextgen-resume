export default function EditorLoading() {
  return (
    <div className="flex h-screen overflow-hidden bg-[#0a0a0f]">
      {/* Left Panel - Form Skeleton */}
      <div className="w-full space-y-6 overflow-y-auto p-8 md:w-1/2">
        {/* Header */}
        <div className="space-y-3">
          <div className="h-8 w-48 animate-pulse rounded-lg bg-gradient-to-r from-purple-500/30 to-pink-500/30" />
          <div className="h-5 w-full animate-pulse rounded bg-white/10" />
        </div>

        {/* Form Sections */}
        {[1, 2, 3, 4].map((section) => (
          <div
            key={section}
            className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl"
          >
            {/* Shimmer effect */}
            <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/10 to-transparent" />

            <div className="relative space-y-4">
              <div className="flex items-center justify-between">
                <div className="h-6 w-32 animate-pulse rounded bg-white/20" />
                <div className="h-8 w-8 animate-pulse rounded-full bg-white/10" />
              </div>

              {/* Form fields */}
              <div className="space-y-3">
                {[1, 2, 3].map((field) => (
                  <div key={field} className="space-y-2">
                    <div className="h-4 w-24 animate-pulse rounded bg-white/15" />
                    <div className="h-10 w-full animate-pulse rounded-lg bg-white/10" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Right Panel - Preview Skeleton */}
      <div className="hidden w-1/2 overflow-y-auto border-l border-white/10 bg-white/5 p-8 backdrop-blur-xl md:block">
        <div className="relative mx-auto aspect-[8.5/11] w-full max-w-2xl overflow-hidden rounded-lg border border-white/10 bg-white shadow-2xl">
          {/* Shimmer effect */}
          <div className="absolute inset-0 -translate-x-full animate-[shimmer_2.5s_infinite] bg-gradient-to-r from-transparent via-white/5 to-transparent" />

          {/* Preview content skeleton */}
          <div className="relative space-y-4 p-12">
            {/* Header section */}
            <div className="space-y-2 border-b border-gray-200 pb-4">
              <div className="h-8 w-48 animate-pulse rounded bg-gray-300" />
              <div className="h-5 w-32 animate-pulse rounded bg-gray-200" />
              <div className="h-4 w-64 animate-pulse rounded bg-gray-200" />
            </div>

            {/* Content sections */}
            {[1, 2, 3].map((section) => (
              <div key={section} className="space-y-2">
                <div className="h-6 w-40 animate-pulse rounded bg-teal-200" />
                <div className="space-y-1">
                  <div className="h-4 w-full animate-pulse rounded bg-gray-200" />
                  <div className="h-4 w-full animate-pulse rounded bg-gray-200" />
                  <div className="h-4 w-3/4 animate-pulse rounded bg-gray-200" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
