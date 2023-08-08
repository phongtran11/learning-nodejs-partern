"use strict";
const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const compression = require("compression");
const app = express();

// init middlewares
app.use(morgan("dev"));
app.use(helmet());
//reduce response size
app.use(compression());

// init db
require("./dbs/init.mongodb");

// init routes

// handling error

module.exports = app;
