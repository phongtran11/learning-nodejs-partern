"use strict";

import dotenv from "dotenv";
import app from "./src/app.js";

dotenv.config();
const PORT = process.env.PORT || 3055;

const server = app.listen(PORT, () => {
  console.log(`server running on port http://localhost:${PORT}`);
});

process.on("SIGTTIN", () => {
  server.close(() => console.log("Exit server express"));
});
