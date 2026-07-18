import Skeleton from "@/components/skleton";

export default function DetailProductSkeleton() {
  return (
    <div className="w-full flex flex-col gap-5 md:flex-row md:gap-7 ">
      <Skeleton className="w-full min-h-72 md:w-1/2 lg:w-[40%] xl:min-h-96" />
      <div className="w-full h-1/2 flex flex-col md:h-auto md:w-1/2 lg:w-[60%] md:justify-between">
        <div className="w-full">
          <Skeleton className="w-full min-h-20 md:min-h-16" />
          <Skeleton className="w-full min-h-32 md:min-h-24 mt-4 xl:min-h-28" />
        </div>
        <Skeleton className="w-full min-h-16 md:min-h-14 mt-5 md:mt-0" />
      </div>
    </div>
  );
}
