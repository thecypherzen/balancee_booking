import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CarMake, CarTypes, ServiceOptions } from "@/components/FilterOptions";
import { ChevronDown } from "lucide-react";
import { useAppDispatch } from "@/state/hooks.js";
import { setFilters } from "@/state/slices.js";
import { useTheme } from "@/hooks/ThemeContext";

type FiltersProps = {
  className: string;
};

const Filters: React.FC<FiltersProps> = ({ className }) => {
  const [services, setServices] = useState<string[]>([]);
  const [carType, setCarType] = useState<string>("");
  const [carMake, setCarMake] = useState<string>("");
  const { theme } = useTheme();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(
      setFilters({
        carType,
        services,
        carMake,
      }),
    );
  }, [services, carType, carMake]);

  return (
    <section
      id="filters"
      className={`flex gap-4 justify-center flex-wrap ${className}`}
    >
      {/* Services */}
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" className="dark:text-secondary/80">
            Services
            <span>
              <ChevronDown />
            </span>
          </Button>
        </PopoverTrigger>
        <PopoverContent
          data-theme={theme}
          className="max-h-[50svh] overflow-y-scroll dark:bg-zinc-700 dark:border-secondary/50"
        >
          <div className="h-6 w-full bg-gradient-to-b from-secondary dark:from-zinc-800 to-transparent sticky top-0" />
          <ServiceOptions services={services} setServices={setServices} />
          <div className="h-10 w-full bg-gradient-to-t from-secondary dark:from-zinc-800 to-transparent sticky bottom-0" />
        </PopoverContent>
      </Popover>
      {/* Car types */}
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" className="dark:text-secondary/80">
            Car Type
            <span>
              <ChevronDown />
            </span>
          </Button>
        </PopoverTrigger>
        <PopoverContent
          data-theme={theme}
          className="max-h-[50svh] overflow-y-scroll relative dark:bg-zinc-700 dark:text-secondary/80 dark:border-secondary/50"
        >
          <div className="h-6 w-full bg-gradient-to-b from-secondary dark:from-zinc-800 to-transparent sticky top-0" />
          <CarTypes carType={carType} setCarType={setCarType} />
          <div className="h-10 w-full bg-gradient-to-t from-secondary dark:from-zinc-800 to-transparent sticky bottom-0" />
        </PopoverContent>
      </Popover>

      {/* Car Make */}
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" className="dark:text-secondary/80">
            Car Make
            <span>
              <ChevronDown />
            </span>
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="max-h-[50svh] overflow-y-scroll relative dark:bg-zinc-700"
          data-theme={theme}
        >
          <div className="h-6 w-full bg-gradient-to-b from-secondary dark:from-zinc-800 to-transparent sticky top-0" />
          <CarMake carMake={carMake} setCarMake={setCarMake} />
          <div className="h-10 w-full bg-gradient-to-t from-secondary dark:from-zinc-800 to-transparent sticky bottom-0" />
        </PopoverContent>
      </Popover>
    </section>
  );
};

export default Filters;
