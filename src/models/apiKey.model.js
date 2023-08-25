"use strict";

import { Schema, model } from "mongoose";

const DOCUMENT_NAME = "ApiKey";
const COLLECTION_NAME = "ApiKeys";

const ApiKeySchema = new Schema(
  {
    key: {
      type: String,
      require: true,
      unique: true,
    },
    status: {
      type: Boolean,
      default: true,
    },
    permissions: {
      type: [String],
      required: true,
      enum: ["0000", "1111", "2222"],
    },
  },
  {
    collection: COLLECTION_NAME,
    timestamps: true,
  }
);

export const apiKeyModel = model(DOCUMENT_NAME, ApiKeySchema);
