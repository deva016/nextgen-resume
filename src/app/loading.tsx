import ResumeItemSkeleton from "@/components/ResumeItemSkeleton";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <main className="mx-auto w-full max-w-7xl space-y-8 px-6 py-8">
      {/* Header Section Skeleton */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-3">
          <Skeleton className="h-6 w-32 rounded-full" />
          <Skeleton className="h-9 w-64" />
          <Skeleton className="h-5 w-48" />
        </div>
        <Skeleton className="h-10 w-36 rounded-lg" />
      </div>

      {/* Resumes Grid Skeleton */}
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        <ResumeItemSkeleton />
        <ResumeItemSkeleton />
        <ResumeItemSkeleton />
        <ResumeItemSkeleton />
        <ResumeItemSkeleton />
        <ResumeItemSkeleton />
        <ResumeItemSkeleton />
        <ResumeItemSkeleton />
      </div>
    </main>
  );
}
