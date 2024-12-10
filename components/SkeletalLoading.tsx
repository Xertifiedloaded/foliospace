import { Skeleton } from "@/components/ui/skeleton"

export default function PortfolioLoading() {
  return (
    <div className="container mx-auto max-w-4xl px-4 py-8">
      <div className="flex items-center space-x-4 mb-8">
        <Skeleton className="h-20 w-20 rounded-full" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-[250px]" />
          <Skeleton className="h-4 w-[200px]" />
        </div>
      </div>
      
      <div className="space-y-4">
        <Skeleton className="h-[100px] w-full" />
        <Skeleton className="h-[100px] w-full" />
      </div>
    </div>
  )
}