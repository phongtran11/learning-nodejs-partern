"use strict";

import { AccessService } from "../services/access.service.js";
class AccessController {
  signUp = async (req, res, next) => {
    try {
      const response = await AccessService.signUp(req.body);

      return res.status(201).json(response);
    } catch (error) {
      next(error);
    }
  };
}

export const accessController = new AccessController();
