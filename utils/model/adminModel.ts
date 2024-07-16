import { Schema, Types, model, models } from "mongoose";
import { iUserData } from "../interfaces";

const adminModel = new Schema<iUserData>(
  {
    name: { type: String },
    email: { type: String, unique: true, require: true },
    password: { type: String },
    avatar: { type: String },
    role: { type: String },
    blogs: { type: [{ type: Types.ObjectId, ref: "blogs" }] },
  },
  { timestamps: true }
);

const myAdminModel = models.admins || model<iUserData>("admins", adminModel);
export default myAdminModel;
