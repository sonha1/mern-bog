import _User from "../models/user.model.js";

export const createUser = async (email, password, name) => {
  const newUser = await _User.create({ email, password, name });
  if (!newUser) {
    return { message: "cant create new user", status: 404 };
  }
  return;
};
