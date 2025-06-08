type FiltersType = {
  services: string[];
  carMake: string;
  carType: string;
};

type StationType = {
  id: string;
  name: string;
  location: {
    address: string;
    zip: string;
    latitude: number;
    longitude: number;
  };
  services: string[];
  supported_car_types: string[];
  supported_car_makes: string[];
  available_slots: string[];
};

export type { FiltersType, StationType };
