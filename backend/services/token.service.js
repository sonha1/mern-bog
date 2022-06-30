"use strict";
import jwt from "jsonwebtoken";

export const generateToken = (payload, secret, expiresTime) => {
  try {
    const token = jwt.sign(payload, secret, {
      expiresIn: expiresTime,
    });
    return token;
  } catch (error) {
    console.log(error);
  }
};
