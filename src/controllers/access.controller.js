"use strict";

import { Created } from "../core/success.response.js";
import { AccessService } from "../services/access.service.js";
class AccessController {
  signUp = async (req, res, next) => {
    return new Created({
      message: "Register successfully",
      metadata: await AccessService.signUp(req.body),
    }).send(res);
  };
}

export const accessController = new AccessController();
