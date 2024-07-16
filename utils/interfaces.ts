import { Document } from "mongoose";

export interface iUser {
  name: string;
  email: string;
  password: string;
  role: string;
  avatar: string;
  blogs: {}[];
}

export interface iUserData extends iUser, Document {}

export interface iClient {
  name: string;
  email: string;
  password: string;
  role: string;
  avatar: string;
}

export interface iClientData extends iClient, Document {}

export interface iBlogs {
  title: string;
  desc: string;
  coverImage: string;
  comments: {}[];
  user: {};
}
export interface iBlogsData extends iBlogs, Document {}

export interface iComments {
  comment: string;
  blog: {};
}
export interface iCommentsData extends iComments, Document {}
