"use strict";

import { keyTokenModel } from "../models/keyToken.model.js";

export class KeyTokenService {
  static createKeyToken = async ({ userId, publicKey, privateKey }) => {
    try {
      const token = await keyTokenModel.create({
        user: userId,
        publicKey,
        privateKey,
      });

      return token ? token.publicKey : null;
    } catch (error) {
      console.log(error);
    }
  };
}
