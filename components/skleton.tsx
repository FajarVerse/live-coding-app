interface SkeletonProps {
  className?: string
}

export default function Skeleton({className}: SkeletonProps) {
  return (
    <div className={`rounded-md md:rounded-lg lg:rounded-xl bg-zinc-800 animate-pulse ${className}`}/>
  )
}