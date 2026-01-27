import "reflect-metadata";
import express from "express";
import morgan from "morgan";
import "dotenv/config";

import { PORT } from "./secrets.js";
import apiRouter from "./routers/index.js";

const app = express();

app.use(express.json());
app.use(morgan("dev"));

app.use("/api", apiRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
