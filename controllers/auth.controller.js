import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken"
export const Signup = async (req, res, next) => {
   
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
export const Signin = async(req,res,next)=>{
    const {email,password} = req.body
    if(!email || !password || email==="" || password===""){
        next(errorHandler(400, "username and password is required"));
    }
    try{
        const validUser = await User.findOne({ email });
         if (!validUser) {
             return next(errorHandler(404, 'User not found'));
        }
        const validPassword = bcryptjs.compareSync(password, validUser.password);
        if (!validPassword) {
          return next(errorHandler(400, 'Invalid password'));
        }
        const {password,...rest} = validUser
        const token = jwt.sign({id:validUser._id},process.env.SECRET_KEY)
        res.status(200).cookie('access_token',token,{httpOnly:true}).json(rest)
    }catch(err){
        next(err)
    }
}