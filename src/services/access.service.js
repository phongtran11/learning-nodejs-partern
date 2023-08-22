"use strict";

import bcrypt from "bcrypt";
import crypto from "crypto";

import { shopModel } from "../models/shop.model.js";
import { KeyTokenService } from "./keyToken.service.js";
import { createTokenPair } from "../auth/authUtils.js";
import _ from "lodash";

const RoleShop = {
  SHOP: "SHOP",
  WRITER: 120,
  EDITOR: 101,
  ADMIN: 130,
};

export class AccessService {
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
        // const { privateKey, publicKey } = crypto.generateKeyPairSync("rsa", {
        //   modulusLength: 4096,
        //   publicKeyEncoding: {
        //     type: "pkcs1", // public key cryptoGraphy Standards
        //     format: "pem",
        //   },
        //   privateKeyEncoding: {
        //     type: "pkcs1", // public key cryptoGraphy Standards
        //     format: "pem",
        //   },
        // });

        const privateKey = crypto.randomBytes(64).toString("hex");
        const publicKey = crypto.randomBytes(64).toString("hex");

        console.log(privateKey, publicKey);

        // const publicKeyString = await KeyTokenService.createKeyToken({
        //   userId: newShop._id,
        //   publicKey,
        // });

        const keyStore = await KeyTokenService.createKeyToken({
          userId: newShop._id,
          publicKey,
          privateKey,
        });

        if (!keyStore) {
          return {
            code: 400,
            message: "key store error!",
          };
        }

        const tokens = await createTokenPair(
          { userId: newShop._id, email: newShop.email },
          publicKey,
          privateKey
        );

        console.log(tokens);

        return {
          code: 201,
          metadata: {
            shop: _.pick(newShop, ["_id", "name", "email"]),
            tokens,
          },
        };
      }
    } catch (error) {
      return {
        code: 500,
        message: error.message,
        status: "error",
      };
    }
  };
}
