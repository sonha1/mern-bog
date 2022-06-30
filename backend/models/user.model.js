import mongoose from "mongoose";
import validator from "validator";
const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      require: true,
      unique: true,
      validate: validator.isEmail,
      maxLength: 30,
      minLength: 4,
    },
    password: {
      type: String,
      require: true,
      select: false,
    },
    name: {
      type: String,
      require: true,
    },
    role: {
      type: String,
      default: "user",
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
  },
  { timestamps: true }
);

export default mongoose.model("user", UserSchema);
