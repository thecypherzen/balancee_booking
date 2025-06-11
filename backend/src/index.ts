import express, { Request, Response } from "express";
import cors from "cors";
import axios from "axios";
import storage from "./storage/fileStorage";
import type { FiltersType } from "@/types";

const port = process.env.PORT ? parseInt(process.env.PORT) : 8082;
const app = express();

// config
app.use(
  cors({
    origin: [
      "http://0.0.0.0:5002",
      "https://balancee-booking-brown.vercel.app",
    ],
    methods: ["GET"],
    credentials: true,
  }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes
app.get("/", (_: Request, res: Response) => {
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
  res.status(404).json({
    error: "Not found",
  });
  return;
});

const server = app.listen(port, "0.0.0.0", () => {
  console.log("backend server up. Port:", port);
});

server.keepAliveTimeout = 120 * 1000;
server.headersTimeout = 120 * 1000;

const pingServer = () => {
  const url =
    process.env.NODE_ENV === "development"
      ? `http://0.0.0.0:${port}`
      : "https://balancee-booking.onrender.com";
  axios
    .get(url)
    .then()
    .catch((err) => {
      console.error(err);
    });
};

setInterval(pingServer, 300000);

export default app;
