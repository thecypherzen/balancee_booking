import * as fs from "fs";
import path from "path";

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
    fs.readFile(this.#path, "utf-8", (err, data) => {
      if (err) {
        console.error(err);
      } else {
        this.#data = JSON.parse(data);
        this.isReady = true;
      }
    });
  }

  get data() {
    return this.#data;
  }
}

const fileStorage = new FileStorage();
fileStorage.init();

export default fileStorage;
