"use strict";

import JWT from "jsonwebtoken";

export const createTokenPair = async (payload, publicKey, privateKey) => {
  try {
    const accessToken = JWT.sign(payload, publicKey, {
      expiresIn: "2 days",
    });

    const refreshToken = JWT.sign(payload, privateKey, {
      expiresIn: "7 days",
    });

    JWT.verify(accessToken, publicKey, (err, decode) => {
      if (err) {
        console.log("error verify", err);
      } else {
        console.log("decode verify", decode);
      }
    });

    return { accessToken, refreshToken };
  } catch (error) {
    console.log("create token pair", error);
  }
};
