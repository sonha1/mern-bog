import {} from "../services/user.service.js";
import _User from "../";
export const login = async (req, res, next) => {};

export const register = async (req, res, next) => {
  const { email, password, name } = req.body;
  if (!email || !password || !name) {
    res.status(400).json({
      message: "please enter email , password and name",
    });
  }
};
