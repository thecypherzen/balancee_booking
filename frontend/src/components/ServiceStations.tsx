import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/state/hooks";
import { getStations } from "@/state/slices";
import type { RootState } from "@/state/types";
import type { StationsFilterType } from "@/state/slices";
import { Badge } from "@/components/ui/badge";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Ban, ChevronDown } from "lucide-react";
import BookStation from "@/components/BookStation";

const ServiceStations: React.FC<StationsType> = ({ className = "" }) => {
  const dispatch = useAppDispatch();
  const stations = useAppSelector((store: RootState) => store.stations);
  const [errorOccured, setErrorOccured] = useState(false);
  const mapsAPIKey = import.meta.env.VITE_GMAPS_API_KEY;

  const fetchStations = async (filters: StationsFilterType | null) => {
    if (filters) {
      try {
        if (errorOccured) {
          setErrorOccured(false);
        }
        await dispatch(getStations(filters)).unwrap();
      } catch (err) {
        setErrorOccured(true);
      }
    }
  };

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
      className={`grid grid-cols-1 md:grid-cols-2 gap-4 w-full ${className}`}
    >
      {stations?.stations?.map((station: Record<string, any>) => {
        console.log(station);
        return (
          <div
            key={station.id}
            className="min-h-[320px] rounded-sm grid shadow-md shadow-primary/5 pb-3 overflow-hidden relative bg-white"
          >
            <div className="absolute top-50 right-8 size-20 lg:top-49 lg:right-14 lg:size-26 rounded-full z-10 flex flex-col items-center justify-center bg-secondary outline-2 outline-secondary outline-offset-5">
              <p>Logo</p>
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
                  <h4 className="font-bold text-2xl mb-2 max-w-3/5 md:max-w-7/10 text-pretty">
                    {station.name}
                  </h4>
                  <p className="text-neutral text-xs">
                    {station.location.address}
                  </p>
                </div>
                {/* Service Badges */}
                <div className="flex flex-col gap-1 mb-5">
                  <span className="text-xs font-semibold text-neutral mb-2">
                    Services
                  </span>
                  <span className="flex gap-x-2 gap-y-1 flex-wrap">
                    {station.services.map((service: string, key: number) => (
                      <Badge
                        variant="outline"
                        className="text-neutral font-light"
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
                        className="text-sm text-primary/90"
                        variant="outline"
                      >
                        Supported Car makes
                        <span>
                          <ChevronDown />
                        </span>
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="border-1 border-zinc-200 max-h-[120px] overflow-y-scroll p-4">
                      {station.supported_car_makes.map(
                        (make: string, key: number) => {
                          return (
                            <p
                              key={`car-make-${key + 1}`}
                              className="text-primary/80"
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
                        className="text-sm text-primary/90"
                        variant="outline"
                      >
                        Supported Car types
                        <span>
                          <ChevronDown />{" "}
                        </span>
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="border-1 border-zinc-200 max-h-[120px] overflow-y-scroll p-4">
                      {station.supported_car_types.map(
                        (make: string, key: number) => {
                          return (
                            <p
                              key={`car-type-${key + 1}`}
                              className="text-primary/80"
                            >
                              {make}
                            </p>
                          );
                        },
                      )}
                    </PopoverContent>
                  </Popover>
                </div>

                {/* Book Now Button */}
                <div className="mt-10">
                  <BookStation />
                </div>

                {/* map */}
                <div className="w-full mt-10 h-[300px] rounded-md overflow-hidden">
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
