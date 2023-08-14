"use strict";

class AccessController {
  signUp = async (req, res, next) => {
    try {
      console.log(req.body);
    } catch (error) {
      next(error);
    }
  };
}

module.exports = new AccessController();
