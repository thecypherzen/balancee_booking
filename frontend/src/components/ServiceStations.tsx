import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/state/hooks";
import { getStations } from "@/state/slices";
import type { RootState } from "@/state/types";
import type { StationsFilterType } from "@/state/slices";

const ServiceStations: React.FC = () => {
  const dispatch = useAppDispatch();
  const stations = useAppSelector((store: RootState) => store.stations);
  const [notFound, setNotFound] = useState(false);

  const fetchStations = async (filters: StationsFilterType | null) => {
    if (filters) {
      try {
        await dispatch(getStations(filters)).unwrap();
      } catch (err) {
        setNotFound(true);
      }
    }
  };

  useEffect(() => {
    fetchStations(stations.filters);
  }, [stations.filters]);

  return (
    <div>
      <h1 className="font-bold text-xl">Services Stations</h1>
      <div>
        <p>
          {notFound
            ? "No stations found"
            : `${stations.stations ? stations.stations.length : 0}`}
        </p>
      </div>
    </div>
  );
};

export default ServiceStations;
