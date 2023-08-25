"use strict";

import { apiKeyModel } from "../models/apiKey.model.js";
export const findById = async (key) => {
  const objectKey = await apiKeyModel.findOne({ key, status: true }).lean();
  return objectKey;
};
