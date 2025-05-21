import express, { Request, Response } from "express";
import cors from "cors";
import storage from "./storage/fileStorage.js";

const port = 8082;
const app = express();

// routes
app.use(cors({ origin: "http://0.0.0.0:5002", credentials: true }));

app.get("/status", (_: Request, res: Response) => {
  console.log("/status called");
  res.json({
    status: "OK",
  });
  return;
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
