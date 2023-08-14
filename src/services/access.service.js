"use strict";

const shopModel = require("../models/shop.model");
const bcrypt = require("bcrypt");
const crypto = require("crypto");

const RoleShop = {
  SHOP: "SHOP",
  WRITER: 120,
  EDITOR: 101,
  ADMIN: 130,
};

class AccessService {
  static signUp = async ({ name, email, password, roles }) => {
    try {
      //     Check email is existing
      const existingShop = await shopModel.findOne({ email }).lean();

      if (existingShop) {
        return {
          code: 400,
          message: "Email already exists!",
        };
      }

      const passwordHash = await bcrypt.hash(password, 10); // salt big will use more memory in cpu
      const newShop = await shopModel.create({
        name,
        email,
        password: passwordHash,
        roles: [RoleShop.SHOP],
      });

      if (newShop) {
        const { privateKey, publicKey } = crypto.generateKeyPairSync("rsa", {
          modulusLength: 4096,
        });

        console.log(privateKey, publicKey);
      }
    } catch (error) {
      return {
        code: 500,
        message: erorr.message,
        status: "error",
      };
    }
  };
}

module.exports = AccessService;
