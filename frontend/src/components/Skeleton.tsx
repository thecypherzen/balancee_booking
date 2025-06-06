import { Skeleton } from "@/components/ui/skeleton";

const StationSkeleton = () => {
  return (
    <Skeleton>
      <div className="min-h-[320px] rounded-sm grid shadow-md shadow-primary/5 pb-3 relative bg-white overflow-hidden">
        <div className="absolute top-50 right-8 size-20 lg:top-49 lg:right-14 lg:size-26 rounded-full z-10 flex flex-col items-center justify-center bg-secondary outline-2 outline-secondary outline-offset-5">
          <p className="size-4 rounded-full bg-secondary"></p>
        </div>
        <div className="h-[240px] bg-neutral/20 overflow-hidden"></div>
        <div className="p-4 h-full">
          <div>
            {/* Heading */}
            <div className="mb-5 flex flex-col gap-2">
              <div className="h-[16px] w-3/5 bg-neutral rounded-md bg-neutral/10"></div>
              <div className="h-[5px] w-2/5 bg-neutral rounded-md bg-neutral/10"></div>
            </div>
            {/* Service Badges */}
            <div className="flex flex-col gap-2">
              <div className="h-[7px] mb-2 bg-neutral/10 rounded-md w-1/6"></div>
              <div className="flex gap-x-2 gap-y-1 flex-wrap">
                <div className="border-1 border-neutral/10 h-[24px] rounded-lg w-1/5"></div>
                <div className="border-1 border-neutral/10 h-[24px] rounded-lg w-1/5"></div>
                <div className="border-1 border-neutral/10 h-[24px] rounded-lg w-2/5"></div>
              </div>
            </div>
            {/* Supported types and makes */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 mt-4">
              <div className="rounded-lg bg-neutral/10 h-[40px] p-2"></div>
              <div className="rounded-lg bg-neutral/10 h-[40px] p-2"></div>
            </div>

            {/* Book Now Form */}
            <div className="mt-10">
              <div className="bg-secondary gap-2 sp-4 md:p-10 rounded-md flex flex-col gap-4 w-full items-start">
                <div className="h-[100px] bg-neutral/10 rounded-md w-4/5"></div>
                <div className="h-[20px] bg-neutral/10 w-2/5 rounded-md"></div>
              </div>
            </div>

            {/* map */}
            <div className="w-full mt-10 h-[200px] rounded-md bg-neutral/8"></div>
          </div>
        </div>
      </div>
    </Skeleton>
  );
};

export { StationSkeleton };
