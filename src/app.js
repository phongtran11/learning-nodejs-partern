"use strict";
import express  from"express";
import morgan  from"morgan";
import helmet  from"helmet";
import compression  from"compression";
const  app = express();

// init middlewares
app.use(morgan("dev"));
app.use(helmet());
//reduce response size
app.use(compression());

// init db
require("./dbs/init.mongodb");

// init routes
app.use("/", require("./routes"));

// handling error
export default  app;
