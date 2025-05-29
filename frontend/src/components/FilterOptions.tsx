import { Checkbox } from "@/components/ui/checkbox";

const ServiceOptions = () => {
  const services = [
    "Oil Change",
    "Tire Replacement",
    "Brake Inspection",
    "Battery Check",
    "Engine Diagnostics",
    "AC Repair",
    "Suspension Check",
    "Transmission Repair",
    "Wheel Alignment",
    "Headlight Replacement",
  ];
  return (
    <div className="flex flex-col items-center border-1 border-grey-500 w-full p-x-2 rounded-md text-primary/80">
      {services.map((service, key) => {
        return (
          <div
            key={`service-${key}`}
            className="flex items-center justify-between w-full hover:bg-secondary rounded-sm p-2 cursor-pointer"
            onClick={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
              e.preventDefault();
              e.currentTarget.firstChild?.dispatchEvent(
                new MouseEvent("click", { bubbles: false }),
              );
            }}
          >
            <label
              htmlFor={`service-${key}`}
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
            >
              {service}
            </label>
            <Checkbox id={`service-${key}`} className="cursor-pointer" />
          </div>
        );
      })}
    </div>
  );
};

export { ServiceOptions };
