"use strict";
import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import compression from "compression";

import { Database } from "./dbs/init.mongodb.js";
import { router } from "./routes/index.js";

const app = express();

// init middlewares
app.use(morgan("dev"));
app.use(helmet());
//reduce response size
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// init db
Database.getInstance();

// init routes
app.use("/", router);

// handling error
export default app;
