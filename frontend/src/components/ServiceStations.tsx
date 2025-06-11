import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/state/hooks";
import { getStations } from "@/state/slices";
import type { RootState } from "@/state/types";
import type {
  StationsDataType,
  StationsFilterType,
  StationsStateType,
} from "@/state/slices";
import { Badge } from "@/components/ui/badge";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Ban, ChevronDown } from "lucide-react";
import BookStation from "@/components/BookStation";
import { StationSkeleton } from "@/components/Skeleton";
import { useTheme } from "@/hooks/ThemeContext";

const ServiceStations: React.FC<StationsType> = ({ className = "" }) => {
  const dispatch = useAppDispatch();
  const stationState: StationsStateType = useAppSelector(
    (store: RootState) => store.stations,
  );
  const stations: StationsDataType | null = stationState.stations;
  const [errorOccured, setErrorOccured] = useState(false);
  const [pageLoaded, setPageLoaded] = useState(false);
  const { theme } = useTheme();
  const mapsAPIKey = import.meta.env.VITE_GMAPS_API_KEY;

  const fetchStations = async (filters: StationsFilterType | null) => {
    if (filters) {
      try {
        if (errorOccured) {
          setErrorOccured(false);
        }
        await dispatch(getStations(filters)).unwrap();
        setPageLoaded(true);
      } catch (err) {
        setErrorOccured(true);
      }
    }
  };

  useEffect(() => {
    fetchStations(stationState.filters);
  }, [stationState.filters]);

  if (errorOccured) {
    return (
      <div className="flex flex-col md:flex-row items-center justify-center gap-2 h-[30svh] text-neutral text-center">
        <span className="flex flex-col items-center justify-center bg-neutral text-secondary rounded-full p-1">
          <Ban size="0.8rem" />
        </span>
        <p className="font-semibold text-md mb-0">
          {" "}
          {stationState.error
            ? `${stationState.error.message}.`
            : "Unexpected Error."}{" "}
        </p>
        <p className="text-sm">
          {stationState?.error?.statusCode === 404
            ? "Modify your filter selections"
            : "Try again later"}
        </p>
      </div>
    );
  }

  if (!pageLoaded) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <StationSkeleton />
        <StationSkeleton />
        <StationSkeleton />
        <StationSkeleton />
      </div>
    );
  }
  return (
    <section
      id="service stations"
      className={`grid grid-cols-1 md:grid-cols-2 gap-4 w-full ${className}`}
    >
      {stations?.map((station: Record<string, any>) => {
        return (
          <div
            key={station.id}
            className="min-h-[320px] rounded-sm grid shadow-md shadow-primary/5 pb-3 overflow-hidden relative bg-white dark:bg-zinc-800"
          >
            <div className="absolute top-50 right-8 size-20 lg:top-49 lg:right-14 lg:size-26 rounded-full z-10 flex flex-col items-center justify-center bg-secondary dark:bg-zinc-700 outline-2 outline-secondary dark:outline-zinc-700 outline-offset-5">
              <p className="dark:text-secondary/50">Logo</p>
            </div>
            <div className="h-[240px] overflow-hidden">
              <img
                src={`${station?.images[0]?.main}`}
                alt={`${station?.name}`}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-4 h-full">
              <div>
                {/* Heading */}
                <div className="mb-5">
                  <h4 className="font-bold text-2xl mb-2 max-w-3/5 md:max-w-7/10 text-pretty dark:text-white">
                    {station.name}
                  </h4>
                  <p className="text-neutral dark:text-secondary/70 text-xs">
                    {station.location.address}
                  </p>
                </div>
                {/* Service Badges */}
                <div className="flex flex-col gap-1 mb-5">
                  <span className="text-xs font-semibold text-neutral mb-2 dark:text-secondary">
                    Services
                  </span>
                  <span className="flex gap-x-2 gap-y-1 flex-wrap">
                    {station.services.map((service: string, key: number) => (
                      <Badge
                        variant="outline"
                        className="text-neutral font-light dark:bg-secondary/70 dark:text-primary/70 dark:font-normal dark:border-secondary/50"
                        key={`service-${key + 1}}`}
                      >
                        {service}
                      </Badge>
                    ))}
                  </span>
                </div>
                {/* Supported types and makes */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 mt-3">
                  <Popover>
                    <PopoverTrigger asChild className="!text-wrap">
                      <Button
                        className="text-sm text-primary/90 dark:text-secondary/90 dark:hover:text-secondary/70 dark:hover:bg-zinc-800/80"
                        variant="outline"
                      >
                        Supported Car makes
                        <span>
                          <ChevronDown />
                        </span>
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent
                      data-theme={theme}
                      className="border-1 border-zinc-200 max-h-[120px] overflow-y-scroll p-4 bg-white dark:bg-zinc-700 dark:text-white"
                    >
                      {station.supported_car_makes.map(
                        (make: string, key: number) => {
                          return (
                            <p
                              key={`car-make-${key + 1}`}
                              className="p-1 rounded-sm text-primary/80 hover:bg-primary/15 dark:text-secondary/80 dark:hover:bg-zinc-800/80"
                            >
                              {make}
                            </p>
                          );
                        },
                      )}
                    </PopoverContent>
                  </Popover>
                  <Popover>
                    <PopoverTrigger asChild className="!text-wrap">
                      <Button
                        className="text-sm text-primary/90 dark:text-secondary/90 dark:hover:text-secondary/70 dark:hover:bg-zinc-800/80"
                        variant="outline"
                      >
                        Supported Car types
                        <span>
                          <ChevronDown />{" "}
                        </span>
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent
                      data-theme={theme}
                      className="border-1 border-zinc-200 max-h-[120px] overflow-y-scroll p-4 bg-white dark:bg-zinc-700 dark:text-white"
                    >
                      {station.supported_car_types.map(
                        (make: string, key: number) => {
                          return (
                            <p
                              key={`car-type-${key + 1}`}
                              className="p-1 rounded-sm text-primary/80 hover:bg-primary/15 dark:text-secondary/80 dark:hover:bg-zinc-800/80"
                            >
                              {make}
                            </p>
                          );
                        },
                      )}
                    </PopoverContent>
                  </Popover>
                </div>

                {/* Book Now Form i*/}
                <div className="mt-10">
                  <div className="bg-secondary dark:bg-primary/90 p-4 md:p-10 rounded-md flex flex-col gap-4 w-full items-start">
                    <h4 className="text-lg font-bold dark:text-secondary/80">
                      Book Appointment
                    </h4>
                    <BookStation />
                  </div>
                </div>

                {/* map */}
                <div className="w-full mt-10 h-[300px] rounded-md overflow-hidden bg-secondary/8 dark:bg-zinc-900/80">
                  <iframe
                    src={`https://www.google.com/maps/embed/v1/place?key=${mapsAPIKey}&q=${station.location.latitude},${station.location.longitude}`}
                    className="w-full h-full"
                    allowFullScreen
                    loading="lazy"
                  ></iframe>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </section>
  );
};

type StationsType = {
  className?: string;
};

export default ServiceStations;
