import express, { Request, Response } from "express";

const port = 8082;

const app = express();

app.listen(port, "0.0.0.0", () => {
  console.log("backend server up"!);
});
