import { CategorySkeleton } from "../components/ui/loading-skeleton"

export default function Loading() {
  return (
    <div className="min-h-screen">
      <div className="h-16 bg-slate-100 animate-pulse" />
      <div className="h-20 bg-white border-b animate-pulse" />
      <div className="container-x py-8">
        <CategorySkeleton />
      </div>
    </div>
  )
}
