import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CarTypes, ServiceOptions } from "@/components/FilterOptions";
import { ChevronDown } from "lucide-react";

const Filters = () => {
  const [services, setServices] = useState<string[]>([]);
  const [carType, setCarType] = useState<string>("");

  return (
    <section id="filters" className="flex gap-x-4">
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline">
            Services
            <span>
              <ChevronDown />
            </span>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="max-h-[50svh] overflow-y-scroll">
          <div className="h-6 w-full bg-gradient-to-b from-secondary to-transparent sticky top-0" />
          <ServiceOptions services={services} setServices={setServices} />
          <div className="h-10 w-full bg-gradient-to-t from-secondary to-transparent sticky bottom-0" />
        </PopoverContent>
      </Popover>
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline">
            Car Type
            <span>
              <ChevronDown />
            </span>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="max-h-[50svh] overflow-y-scroll relative">
          <div className="h-6 w-full bg-gradient-to-b from-secondary to-transparent sticky top-0" />
          <CarTypes carType={carType} setCarType={setCarType} />
          <div className="h-10 w-full bg-gradient-to-t from-secondary to-transparent sticky bottom-0" />
        </PopoverContent>
      </Popover>
    </section>
  );
};

export default Filters;
