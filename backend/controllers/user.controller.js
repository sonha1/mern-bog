"use strict";
import {
  createUser,
  checkUserValid,
  encode,
  comparePassword,
  getToken,
} from "../services/user.service.js";
import _User from "../models/user.model.js";
export const login = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await checkUserValid({ email });
  if (!email || !password) {
    return res.status(400).json({
      message: "please enter email , password",
    });
  }

  if (!user) {
    return res.status(400).json({
      message: "user is not existed",
    });
  }

  if (!(await comparePassword(password, user.password))) {
    return res.status(400).json({
      message: "password is not match",
    });
  }

  const { accessToken, refreshToken } = getToken({
    id: user._id,
  });
  res.cookie("accessToken", accessToken, {
    expires: new Date(Date.now() + 12 * 60 * 1000),
    httpOnly: true,
    secure: false,
  });

  res.cookie("refreshToken", refreshToken, {
    expires: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
    httpOnly: true,
    secure: false,
  });

  // console.log(accessToken, refreshToken);
  res
    .status(200)
    .json({ message: "nan", accessToken, refreshToken, ...user._doc });
};

export const register = async (req, res, next) => {
  try {
    const { email, password, name } = req.body;
    if (!email || !password || !name) {
      return res.status(400).json({
        message: "please enter email , password and name",
      });
    }

    if (await checkUserValid({ email })) {
      return res.status(400).json({
        message: "user is existed",
      });
    }

    const hashPassword = await encode(password);
    const { message, status, data } = await createUser({
      email,
      hashPassword,
      name,
    });
    res.status(status).json({
      message,
      data,
    });
  } catch (error) {
    next(error);
  }
};
