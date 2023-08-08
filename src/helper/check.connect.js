"use strict";
const mongoose = require("mongoose");
const os = require("os");
const process = require("process");

const _FIVE_SECONDS = 1000;

const countConnect = () => {
  const numConnection = mongoose.connections.length;
  console.log(`Number of connection: ${numConnection}`);
};

const checkOverload = () => {
  setInterval(() => {
    const numConnection = mongoose.connections.length;
    const numCores = os.cpus().length;
    const memoryUsage = process.memoryUsage();

    // one core can process five connection
    const maxConnections = numCores * 5;

    console.log(`Memory usage: ${memoryUsage.heapUsed / 1024 / 1024}MB`);
    console.log(`Active connections: ${numConnection}`);

    if (numConnection > maxConnections) {
      console.log("Connection overload!");
    }
  }, _FIVE_SECONDS);
};

module.exports = {
  countConnect,
  checkOverload,
};
