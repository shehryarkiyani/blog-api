import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
export const Signup = async (req, res, next) => {
    console.log(req.body,"req.body")
  try {
   
    if (
      !req.body.username ||
      !req.body.email ||
      !req.body.password ||
      req.body.username === "" ||
      req.body.email === "" ||
      req.body.password === ""
    ) {
      next(errorHandler(400, "All fields are required"));
    }
    const hashedPassword = bcryptjs.hashSync(req.body.password, 10);
    const newUser = await User({
      username:req.body.username,
      email:req.body.email,
      password: hashedPassword,
    });

    await newUser.save();
    res.status(200).json({ message: "Signup Successfull" });
  } catch (err) {
    next(err);
  }
};
