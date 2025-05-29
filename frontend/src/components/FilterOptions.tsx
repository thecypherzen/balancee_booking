import { Checkbox } from "@/components/ui/checkbox";

type ServicesProps = {
  services: string[];
  setServices: React.Dispatch<React.SetStateAction<string[]>>;
};

const ServiceOptions: React.FC<ServicesProps> = ({ services, setServices }) => {
  const servicesList = [
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

  const toggleServices = (service: string) => {
    const newServices = services.includes(service)
      ? services.filter((svc) => svc !== service)
      : [...services, service];
    setServices(newServices);
  };

  return (
    <div className="flex flex-col items-center border-1 border-grey-500 w-full p-x-2 rounded-md text-primary/80">
      {servicesList.map((service, key) => {
        return (
          <div
            key={`service-${key + 1}`}
            className="flex items-center justify-between w-full hover:bg-secondary rounded-sm p-2"
          >
            <label
              htmlFor={`service-${key + 1}`}
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
            >
              {service}
            </label>
            <Checkbox
              id={`service-${key + 1}`}
              className="cursor-pointer"
              checked={services.includes(service)}
              onCheckedChange={() => {
                toggleServices(service);
              }}
            />
          </div>
        );
      })}
    </div>
  );
};

export { ServiceOptions };
