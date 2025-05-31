import * as fs from "fs";
import path from "path";
import type { FiltersType, StationType } from "@/types";

class FileStorage {
  isReady: boolean;
  #data: Record<string, any> | null;
  #path: string;

  constructor(filepath?: string) {
    this.isReady = false;
    this.#data = null;
    this.#path = filepath || path.resolve(__dirname, "db.json");
  }

  async init() {
    this.load();
  }

  get data() {
    return this.#data;
  }

  async save() {
    if (this.#data) {
      const data = JSON.stringify(this.#data);
      fs.writeFile(this.#path, data, (err) => {
        if (err) {
          throw err;
        }
      });
    }
  }

  async load() {
    fs.readFile(this.#path, "utf-8", (err, data) => {
      if (err) {
        throw err;
      }
      this.#data = JSON.parse(data);
      if (!this.isReady) {
        this.isReady = true;
      }
    });
  }

  async reload() {
    await this.save();
    await this.load();
  }

  async close() {
    await this.save();
    this.#data = null;
    this.isReady = false;
  }

  async awaitReady() {
    let retries = 0;
    const checkReady = async () => {
      setTimeout(() => {
        retries += 1;
      }, 1000);
    };
    while (!this.isReady && retries < 5) {
      await checkReady();
    }
    if (retries === 5) {
      throw new Error("Fatal. Couldn't load database");
    }
    return this.isReady;
  }

  async update(field: string, value: any) {
    console.log(`updating ${field} with ${value}`);
  }

  async filter(field: string, filters: FiltersType) {
    try {
      await this.awaitReady();
      const results = this.data ? this.data[field] : [];
      //filtering
      if (field === "stations") {
        let stations = results.filter(
          (station: StationType) =>
            filters.services.every((service) =>
              station.services.includes(service),
            ) &&
            station.supported_car_types.includes(filters.carType) &&
            station.supported_car_makes.includes(filters.carMake),
        );
        return stations;
      }
      return results.users;
    } catch (error) {
      // console.log(error);
      throw error;
    }
  }
}

const fileStorage = new FileStorage();
fileStorage.init();

export default fileStorage;
