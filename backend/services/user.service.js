"use strict";
import _User from "../models/user.model.js";
import bcrypt from "bcrypt";
import { generateToken } from "./token.service.js";
export const createUser = async ({ email, hashPassword, name }) => {
  try {
    const newUser = await _User.create({ email, password: hashPassword, name });

    if (!newUser) {
      return { message: "cant create new user", status: 404 };
    }
    return { message: "create new user success", status: 200, data: newUser };
  } catch (err) {
    console.error(err);
  }
};
export const checkUserValid = async ({ email }) => {
  try {
    const user = await _User.findOne({ email }).select("+password");

    return user;
  } catch (err) {
    console.log(err);
  }
};
export const encode = async (string) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashString = await bcrypt.hash(string, salt);
    return hashString;
  } catch (err) {
    console.log(err);
  }
};

export const comparePassword = async (string, hashString) => {
  try {
    const check = await bcrypt.compare(string, hashString);
    return check ? 1 : 0;
  } catch (error) {
    console.log(error);
  }
};
export const getToken = (payload) => {
  try {
    const accessToken = generateToken(
      payload,
      process.env.ACCESS_SECRET_KEY,
      process.env.EXPIRE_TIME_ACCESS_TOKEN
    );
    const refreshToken = generateToken(
      payload,
      process.env.REFRESH_SECRET_KEY,
      process.env.EXPIRE_TIME_REFRESH_TOKEN
    );

    return { accessToken, refreshToken };
  } catch (error) {
    console.log(error);
  }
};

export const update = async ({ name, id }) => {
  try {
    const user = await _User.findOneAndUpdate({ _id: id }, { name });
    return user ? 1 : 0;
  } catch (error) {
    console.log(error);
  }
};
