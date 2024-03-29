import mongoose from "mongoose"
import User from "../models/User.js"
import bcrypt from "bcryptjs"
import { createError } from "../error.js";
import jwt from "jsonwebtoken"


export const signup = async (req,res,next ) => {
  try {

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    const newUser = new User({ ...req.body, password: hashedPassword });
    await newUser.save();
    res.status(200).send("User created");
  } catch (err) {
    next(err)
  }

};
export const signin = async (req,res,next ) => {
  try {
    const user = await User.findOne({name:req.body.name})
    if(!user) return next(createError(404,"Wrong Credentials!"))

    const token =jwt.sign({id:user._id}, process.env.JWT)
    const { password, ...others } = user._doc

    res
      .cookie("access_token", token ,{
        httpOnly:true
    })
    .status(200)
    .json(others)
  } catch (err) {
    next(err)
  }

};