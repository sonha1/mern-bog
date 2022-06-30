"use strict";
import jwt from "jsonwebtoken";

export const generateToken = (payload, secret, expiresTime) => {
  try {
    const accessToken = jwt.sign(payload, secret, {
      expiresIn: expiresTime,
    });
    return accessToken;
  } catch (error) {
    console.log(error);
  }
};
