import express, { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../user/user.model";
import { TUser } from "../user/user.interface";
const JWT_SECRET = process.env.JWT_SECRET || "default_secret_key";

// ✅ SIGNUP
const signup = async (req: Request, res: Response) => {
  const { name, email, phone, password, address, profilePicture } =
    req.body as TUser;

  try {
    if (!name || !email || !phone) {
      return res
        .status(400)
        .json({ message: "Name, email, and phone are required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res
        .status(400)
        .json({ message: "User already exists with this email" });

    const hashedPassword = password
      ? await bcrypt.hash(password, 10)
      : undefined;

    const newUser = new User({
      name,
      email,
      phone,
      password: hashedPassword,
      address,
      profilePicture,
      role: req.body?.role || "user",
    });

    await newUser.save();

    res.status(201).json({
      message: "User created successfully!",
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        phone: newUser.phone,
        address: newUser.address,
        role: newUser.role,
        profilePicture: newUser.profilePicture,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Signup failed", error });
  }
};

// ✅ LOGIN
const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    if (!email || !password)
      return res
        .status(400)
        .json({ message: "Email and password are required" });

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const isPasswordValid = await bcrypt.compare(password, user.password || "");
    if (!isPasswordValid)
      return res
        .status(401)
        .json({ message: "Email or password can be wrong ! check again" });

    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
        address: user.address,
        profile: user.profilePicture,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Login failed", error });
  }
};

export const authControllers = {
  signup,
  login,
};
