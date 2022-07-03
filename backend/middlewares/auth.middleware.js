"use strict";
import jwt from "jsonwebtoken";
import _User from "../models/user.model.js";
export const verifyToken = (req, res, next) => {
  try {
    const accessToken = req.cookies.accessToken;

    jwt.verify(
      accessToken,
      process.env.ACCESS_SECRET_KEY,
      async (err, user) => {
        if (err) {
          return res.status(400).json({ message: "token is not valid" });
        }
        const data = await _User.findById(user.id);
        req.user = data._doc;
        next();
      }
    );
  } catch (error) {
    console.log(error);
  }
};
export const checkRole = (...roles) => {
  try {
    return (req, res, next) => {
      if (roles.includes(req.user.role)) {
        return next();
      }
      console.log(req.user);
      return res.status(400).json("you cant use this service");
    };
  } catch (error) {
    console.log(error);
  }
};
