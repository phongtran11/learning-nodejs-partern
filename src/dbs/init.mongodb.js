"use strict";
const mongoose = require("mongoose");
const { countConnect } = require("../helper/check.connect");
const config = require("../config/config");

const connectionString = `mongodb://${config.db.host}:${config.db.port}/${config.db.name}`;

class Database {
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

const instanceMongodb = Database.getInstance();

module.exports = instanceMongodb;
