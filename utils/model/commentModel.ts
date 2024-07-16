import { Schema, Types, model, models } from "mongoose";
import { iCommentsData } from "../interfaces";

const commentModel = new Schema<iCommentsData>(
  {
    comment: { type: String },
    blog: { type: Types.ObjectId, ref: "blogs" },
  },
  { timestamps: true }
);

const myComment =
  models.comments || model<iCommentsData>("comments", commentModel);
export default myComment;
