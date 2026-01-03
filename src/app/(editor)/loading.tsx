import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="flex grow flex-col">
      {/* Header Skeleton */}
      <header className="space-y-1.5 border-b px-3 py-5 text-center">
        <Skeleton className="h-8 w-64 mx-auto" />
        <Skeleton className="h-4 w-96 mx-auto" />
      </header>

      {/* Main Content - Split Screen */}
      <main className="relative grow">
        <div className="absolute bottom-0 top-0 flex w-full">
          {/* Left Side - Form Skeleton */}
          <div className="w-full space-y-6 overflow-y-auto p-3 md:w-1/2">
            {/* Breadcrumbs Skeleton */}
            <div className="flex gap-2">
              <Skeleton className="h-10 w-24 rounded-lg" />
              <Skeleton className="h-10 w-24 rounded-lg" />
              <Skeleton className="h-10 w-24 rounded-lg" />
              <Skeleton className="h-10 w-24 rounded-lg" />
            </div>

            {/* Form Fields Skeleton */}
            <div className="space-y-6">
              <div className="space-y-2">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-10 w-full rounded-lg" />
              </div>
              <div className="space-y-2">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-10 w-full rounded-lg" />
              </div>
              <div className="space-y-2">
                <Skeleton className="h-4 w-40" />
                <Skeleton className="h-24 w-full rounded-lg" />
              </div>
              <div className="space-y-2">
                <Skeleton className="h-4 w-28" />
                <Skeleton className="h-10 w-full rounded-lg" />
              </div>
              <div className="space-y-2">
                <Skeleton className="h-4 w-36" />
                <Skeleton className="h-10 w-full rounded-lg" />
              </div>
            </div>
          </div>

          <div className="grow md:border-r" />

          {/* Right Side - Resume Preview Skeleton */}
          <aside className="hidden w-1/2 md:flex md:flex-col">
            <div className="grow overflow-y-auto p-3">
              <div className="mx-auto aspect-[1/1.4142] max-w-2xl border border-white/10 bg-white/5 rounded-lg p-8 space-y-3">
                {/* Resume header */}
                <div className="space-y-2">
                  <Skeleton className="h-6 w-48" />
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-3 w-40" />
                </div>
                
                <div className="h-4" />
                
                {/* Resume sections */}
                <div className="space-y-2">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-3 w-full" />
                  <Skeleton className="h-3 w-5/6" />
                </div>
                
                <div className="h-3" />
                
                <div className="space-y-2">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-3 w-full" />
                  <Skeleton className="h-3 w-4/5" />
                  <Skeleton className="h-3 w-5/6" />
                </div>

                <div className="h-3" />
                
                <div className="space-y-2">
                  <Skeleton className="h-4 w-40" />
                  <Skeleton className="h-3 w-full" />
                  <Skeleton className="h-3 w-3/4" />
                </div>
              </div>
            </div>
          </aside>
        </div>
      </main>

      {/* Footer Skeleton */}
      <footer className="border-t px-3 py-5">
        <div className="flex justify-between items-center max-w-7xl mx-auto">
          <Skeleton className="h-10 w-24 rounded-lg" />
          <Skeleton className="h-10 w-24 rounded-lg" />
        </div>
      </footer>
    </div>
  );
}
