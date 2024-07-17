import { dbConfig } from "@/utils/dbConfig";
import myAdminModel from "@/utils/model/adminModel";
import myBlogModel from "@/utils/model/blogsModel";
import { NextRequest, NextResponse } from "next/server";
import cloudinary from "@/utils/cloudinary";
import streamifier from "streamifier";

export const POST = async (req: NextRequest, { params }: any) => {
  try {
    await dbConfig();
    const { title, desc, coverImage } = await req.json();
    const { adminID } = await params;
    const admin = await myAdminModel.findById(adminID);
    const getD = await myBlogModel.create({
      title,
      desc,
      coverImage,
      user: admin,
    });
    admin.blogs.push(getD);
    admin.save();
    return NextResponse.json({
      message: "Blog Created",
      status: 200,
      data: getD,
    });
  } catch (error: any) {
    return NextResponse.json({
      message: "Error OCcured",
      status: 400,
      error: error.message,
    });
  }
};

export const GET = async (req: NextRequest, { params }: any) => {
  try {
    await dbConfig();
    const { adminID } = await params;
    const getD = await myAdminModel
      .findById(adminID)
      .populate({ path: "blogs" });
    return NextResponse.json({
      message: "All Blogs",
      data: getD,
      status: 200,
    });
  } catch (error: any) {
    return NextResponse.json({
      message: "Error Occured",
      status: 400,
      error: error.message,
    });
  }
};
