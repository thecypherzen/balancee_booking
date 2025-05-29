import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ServiceOptions } from "@/components/FilterOptions";
import { ChevronDown } from "lucide-react";

const Filters = () => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">
          Select an option
          <span>
            <ChevronDown />
          </span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="max-h-[50svh] overflow-y-scroll">
        <ServiceOptions />
      </PopoverContent>
    </Popover>
  );
};

export default Filters;
