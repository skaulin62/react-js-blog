import jwt from "jsonwebtoken";

import UserModel from "../models/User.js";
import bcrypt from "bcrypt";

export const register = async (req, res) => {
  try {
    const password = req.body.password;
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    // objec user
    const doc = new UserModel({
      email: req.body.email,
      fullName: req.body.fullName,
      avatarUrl: req.body.avatarUrl,
      passwordHash: hash,
    });
    //save user
    const user = await doc.save();
    //for response
    const token = jwt.sign(
      {
        _id: user._id,
      },
      "secret123",
      {
        expiresIn: "30d",
      }
    );

    const { passwordHash, ...userData } = user._doc;
    res.json({
      ...userData,
      token,
    });
  } catch (err) {
    console.log(err, 123);
    res.status(500).json(err);
  }
};

export const getUser = async (req, res) => {
  try {
    const user = await UserModel.findById(req.userId);
    if (!user) {
      return res.status("404").json({ message: "User is not found" });
    }
    const token = jwt.sign(
      {
        _id: user._id,
      },
      "secret123",
      {
        expiresIn: "30d",
      }
    );

    const { passwordHash, ...userData } = user._doc;
    res.json({
      ...userData,
      // token,
    });
  } catch (err) {
    res.status("500").json({
      message: err.message,
    });
  }
};

export const login = async (req, res) => {
  try {
    const user = await UserModel.findOne({ email: req.body.email });

    if (!user) {
      return res.status("404").json({
        message: "Password or login not found",
      });
    }

    const isValidPassword = await bcrypt.compare(
      req.body.passwordHash,
      user._doc.passwordHash
    );

    if (!isValidPassword) {
      return res.status("404").json({
        message: "Password or login not found",
      });
    }
    //for response
    const token = jwt.sign(
      {
        _id: user._id,
      },
      "secret123",
      {
        expiresIn: "30d",
      }
    );

    const { passwordHash, ...userData } = user._doc;
    res.json({
      ...userData,
      token,
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).json(err);
  }
};
