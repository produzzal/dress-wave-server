// models/User.ts
import mongoose, { Schema, Document } from "mongoose";
import { TUser } from "./user.interface";

export interface IUser extends TUser, Document {}

const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    password: { type: String, required: true },
    address: { type: String },
    role: { type: String, enum: ["admin", "user"], default: "user" },
    profilePicture: { type: String },
  },
  {
    timestamps: true,
  }
);

export const User = mongoose.model<IUser>("User", userSchema);
