import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/state/hooks";
import { getStations } from "@/state/slices";
import type { RootState } from "@/state/types";
import type { StationsFilterType } from "@/state/slices";
import { Ban } from "lucide-react";

const ServiceStations: React.FC<StationsType> = ({ className = "" }) => {
  const dispatch = useAppDispatch();
  const stations = useAppSelector((store: RootState) => store.stations);
  const [errorOccured, setErrorOccured] = useState(false);

  const fetchStations = async (filters: StationsFilterType | null) => {
    if (filters) {
      try {
        await dispatch(getStations(filters)).unwrap();
      } catch (err) {
        setErrorOccured(true);
      }
    }
  };

  useEffect(() => {
    console.log(stations.stations);
  }, [stations.stations]);

  useEffect(() => {
    fetchStations(stations.filters);
  }, [stations.filters]);

  if (errorOccured) {
    return (
      <div className="flex flex-col md:flex-row items-center justify-center gap-2 h-[30svh] text-neutral text-center">
        <span className="flex flex-col items-center justify-center bg-neutral text-secondary rounded-full p-1">
          <Ban size="0.8rem" />
        </span>
        <p className="font-semibold text-md mb-0">
          {" "}
          {stations ? `${stations?.error?.message}.` : "Unexpected Error."}{" "}
        </p>
        <p className="text-sm">
          {stations?.error?.statusCode === 404
            ? "Modify your filter selections"
            : "Try again later"}
        </p>
      </div>
    );
  }
  return (
    <section
      id="service stations"
      className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full border-1 border-zinc-300 ${className}`}
    >
      <div className="min-h-[100px]  rounded-sm border-1 border-zinc-300"></div>
      <div className="min-h-[100px]  rounded-sm border-1 border-zinc-300"></div>
      <div className="min-h-[100px]  rounded-sm border-1 border-zinc-300"></div>
      <div className="min-h-[100px]  rounded-sm border-1 border-zinc-300"></div>
    </section>
  );
};

type StationsType = {
  className?: string;
};

export default ServiceStations;
