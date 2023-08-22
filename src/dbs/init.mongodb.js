"use strict";

import mongoose from "mongoose";

import { countConnect } from "../helper/check.connect.js";
import { appConfig } from "../config/config.js";

const connectionString = `mongodb://${appConfig.db.host}:${appConfig.db.port}/${appConfig.db.name}`;

export class Database {
  constructor() {
    this.connect();
  }

  static getInstance() {
    if (!Database.instance) {
      Database.instance = new Database();
    }

    return Database.instance;
  }

  connect(type = "mongodb") {
    if (true) {
      mongoose.set("debug", true);
      mongoose.set("debug", { color: true });
    }
    mongoose
      .connect(connectionString, {
        maxPoolSize: 50,
      })
      .then((_) => {
        console.log("Connect mongoDB success!");
        countConnect();
      })
      .catch((err) => console.log("Error connect!"));
  }
}
