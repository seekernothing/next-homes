import { Skeleton } from "@/components/ui/skeleton";
import { HomeIcon, SearchIcon } from "lucide-react";

export default function Loading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      {/* Loading Header Section */}
      <div className="relative bg-card/80 backdrop-blur-sm border-b border-border/50">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-primary/5" />
        <div className="relative max-w-7xl mx-auto px-4 py-12">
          <div className="text-center">
            <div className="inline-flex items-center gap-3 bg-primary/10 text-primary px-6 py-3 rounded-full text-sm font-medium mb-6">
              <SearchIcon className="w-5 h-5 animate-pulse" />
              <span>Property Search</span>
            </div>
            <Skeleton className="h-16 w-96 mx-auto mb-4 bg-primary/20" />
            <Skeleton className="h-6 w-80 mx-auto bg-muted-foreground/20" />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Loading Filters Section */}
        <div className="mb-8">
          <Skeleton className="h-32 w-full bg-card/50" />
        </div>

        {/* Loading Results Header */}
        <div className="mb-8">
          <Skeleton className="h-8 w-64 bg-muted-foreground/20" />
        </div>

        {/* Loading Properties Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="space-y-4">
              {/* Property Card Skeleton */}
              <div className="bg-card/80 backdrop-blur-sm border border-border/50 rounded-2xl overflow-hidden shadow-sm">
                {/* Image Skeleton */}
                <Skeleton className="h-64 w-full bg-muted-foreground/20" />

                {/* Content Skeleton */}
                <div className="p-6 space-y-4">
                  <Skeleton className="h-6 w-full bg-muted-foreground/20" />
                  <div className="flex items-center gap-6 py-3">
                    <div className="flex items-center gap-2">
                      <Skeleton className="w-8 h-8 rounded-lg bg-muted-foreground/20" />
                      <div className="space-y-1">
                        <Skeleton className="h-3 w-16 bg-muted-foreground/20" />
                        <Skeleton className="h-4 w-8 bg-muted-foreground/20" />
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Skeleton className="w-8 h-8 rounded-lg bg-muted-foreground/20" />
                      <div className="space-y-1">
                        <Skeleton className="h-3 w-16 bg-muted-foreground/20" />
                        <Skeleton className="h-4 w-8 bg-muted-foreground/20" />
                      </div>
                    </div>
                  </div>
                  <Skeleton className="h-12 w-full bg-primary/20" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Loading Pagination */}
        <div className="flex items-center justify-center">
          <div className="flex items-center gap-2">
            {Array.from({ length: 3 }).map((_, index) => (
              <Skeleton
                key={index}
                className="w-12 h-12 rounded-xl bg-muted-foreground/20"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
