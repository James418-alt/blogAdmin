import { Schema, Types, model, models } from "mongoose";
import { iBlogsData } from "../interfaces";

const blogModel = new Schema<iBlogsData>(
  {
    title: {
      type: String,
    },
    desc: { type: String },
    coverImage: { type: String },
    comments: { type: [{ type: Types.ObjectId, ref: "comments" }] },
    user: { type: Types.ObjectId, ref: "admins" },
  },
  { timestamps: true }
);

const myBlogModel = models.blogs || model<iBlogsData>("blogs", blogModel);
export default myBlogModel;
