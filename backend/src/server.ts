import express, { Request, Response } from "express";
import cors from "cors";
import storage from "./storage/fileStorage.js";
import type { FiltersType } from "@/types";

const port = 8082;
const app = express();

// config
app.use(cors({ origin: "http://0.0.0.0:5002", credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes
app.get("/status", (_: Request, res: Response) => {
  console.log("/status called");
  res.json({
    status: "OK",
  });
  return;
});

app.get("/stations", async (req: Request, res: Response) => {
  const params = req.query;
  const services = params.services
    ? Array.isArray(params.services)
      ? params.services
      : [params.services].filter(Boolean)
    : [];
  const filters = {
    services,
    carType: params.carType,
    carMake: params.carMake,
  } as FiltersType;
  try {
    const stations = await storage.filter("stations", filters);
    if (!stations.length) {
      res.status(404).json({ error: "Not found" });
      return;
    }
    res.json({ data: stations });
  } catch (error: any) {
    res.status(500).json({ error: error?.message ?? "Fatal error occured" });
  }
});

app.all(/\/*/, (_: Request, res: Response) => {
  console.log("404 handler called");
  res.status(404).json({
    error: "Not found",
  });
  return;
});

app.listen(port, "0.0.0.0", () => {
  console.log("backend server up. Port:", port);
});
