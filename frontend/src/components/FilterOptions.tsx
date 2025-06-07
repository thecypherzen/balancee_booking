import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

type ServicesProps = {
  services: string[];
  setServices: React.Dispatch<React.SetStateAction<string[]>>;
};

// Services
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
    <div className="flex flex-col items-center p-x-2 rounded-md text-primary/80 px-3">
      {servicesList.map((service, key) => {
        return (
          <div
            key={`service-${key + 1}`}
            className="flex items-center justify-between w-full hover:bg-secondary dark:hover:bg-zinc-800 rounded-sm p-2"
          >
            <label
              htmlFor={`service-${key + 1}`}
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer dark:text-secondary/90"
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

// Car Types
type CarTypeProps = {
  carType: string;
  setCarType: React.Dispatch<React.SetStateAction<string>>;
};
const CarTypes: React.FC<CarTypeProps> = ({ carType, setCarType }) => {
  const carTypesList = [
    "Crossover(CUV)",
    "Truck",
    "Wagon(Estate)",
    "Sedan(Saloon)",
    "Hatchback",
    "Coupe",
    "Convertible(Roadster)",
    "Minivan(MPV)",
    "SUV",
    "Pickup Truck",
    "Limousine",
    "Bus",
    "Microcar",
    "Motorhome",
  ];

  return (
    <div className="flex flex-col items-center rounded-md text-primary/80 px-3">
      <RadioGroup
        className="gap-1 w-full"
        value={carType}
        onValueChange={(newValue) => setCarType(newValue)}
      >
        {carTypesList.map((carType, key) => {
          return (
            <div
              key={`car-type-${key + 1}`}
              className="flex items-center justify-between w-full hover:bg-secondary dark:hover:bg-zinc-800 rounded-sm p-2"
            >
              <label
                htmlFor={`car-type-${key + 1}`}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer dark:text-secondary/90"
              >
                {carType}
              </label>
              <RadioGroupItem
                id={`car-type-${key + 1}`}
                className="cursor-pointer"
                value={`${carType}`}
              />
            </div>
          );
        })}
      </RadioGroup>
    </div>
  );
};

// Car Makes
type CarMakeProps = {
  carMake: string;
  setCarMake: React.Dispatch<React.SetStateAction<string>>;
};
const CarMake: React.FC<CarMakeProps> = ({ carMake, setCarMake }) => {
  const carMakesList = [
    "Toyota",
    "Lexus",
    "Daihatsu",
    "Volkswagen",
    "Audi",
    "Porsche",
    "Bentley",
    "Bugatti",
    "Skoda",
    "Lamborghini",
    "Hyundai",
    "Kia",
    "Genesis",
    "Stellantis",
    "Fiat",
    "Jeep",
    "Dodge",
    "Peugeot",
    "Citroën",
    "Opel",
    "Chevrolet",
    "GMC",
    "Buick",
    "Ford",
    "Acura",
    "Nissan",
    "Mitsubishi",
    "BMW",
    "Mini",
    "Rolls-Royce",
    "Mercedes-Benz",
    "Smart",
    "Tesla",
    "Innoson",
    "Nord",
  ];

  return (
    <div className="flex flex-col items-center rounded-md text-primary/80 px-3">
      <RadioGroup
        className="gap-1 w-full"
        value={carMake}
        onValueChange={(newValue) => setCarMake(newValue)}
      >
        {carMakesList.map((carMake, key) => {
          return (
            <div
              key={`car-make-${key + 1}`}
              className="flex items-center justify-between w-full hover:bg-secondary dark:hover:bg-zinc-800 rounded-sm p-2"
            >
              <label
                htmlFor={`car-make-${key + 1}`}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer dark:text-secondary/80"
              >
                {carMake}
              </label>
              <RadioGroupItem
                id={`car-make-${key + 1}`}
                className="cursor-pointer"
                value={`${carMake}`}
              />
            </div>
          );
        })}
      </RadioGroup>
    </div>
  );
};

export { CarMake, CarTypes, ServiceOptions };
