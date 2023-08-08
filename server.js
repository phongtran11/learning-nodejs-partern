"use strict";
require("dotenv").config();
const app = require("./src/app");

const PORT = process.env.PORT || 3055;

const server = app.listen(PORT, () => {
  console.log(`server running on port http://localhost:${PORT}`);
});

process.on("SIGTTIN", () => {
  server.close(() => console.log("Exit server express"));
});
