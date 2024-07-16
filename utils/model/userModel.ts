import { Schema, Types, model, models } from "mongoose";
import { iClientData, iUserData } from "../interfaces";

const adminModel = new Schema<iClientData>(
  {
    name: { type: String },
    email: { type: String, unique: true, require: true },
    password: { type: String },
    avatar: { type: String },
    role: { type: String },
  },
  { timestamps: true }
);

const myUserModel = models.users || model<iClientData>("users", adminModel);
export default myUserModel;
