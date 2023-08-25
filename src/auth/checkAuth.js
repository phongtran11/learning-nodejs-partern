"use strict";

import { findById } from "../services/apiKey.service.js";

const HEADER = {
  API_KEY: "x-api-key",
  AUTHORIZATION: "authorization",
};

export const apiKey = async (req, res, next) => {
  try {
    const key = req.headers[HEADER.API_KEY]?.toString();

    if (!key) {
      return res.status(403).json({
        message: "Forbidden Error",
      });
    }

    // check api key in db
    const objectKey = await findById(key);

    if (!objectKey) {
      return res.status(403).json({
        message: "Forbidden Error",
      });
    }

    req.objKey = objectKey;

    return next();
  } catch (error) {}
};

export const permission = (permission) => {
  return (req, res, next) => {
    if (!req.objKey.permissions) {
      return res.status(403).json({
        message: "permission denied",
      });
    }

    const validPermission = req.objKey.permissions.includes(permission);

    if (!validPermission) {
      return res.status(403).json({
        message: "permission denied",
      });
    }

    return next();
  };
};

export const asyncHandler = (fn) => {
  return (req, res, next) => {
    fn(req, res, next).catch(next);
  };
};
