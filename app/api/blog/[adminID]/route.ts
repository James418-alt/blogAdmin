import { dbConfig } from "@/utils/dbConfig";
import myAdminModel from "@/utils/model/adminModel";
import myBlogModel from "@/utils/model/blogsModel";
import { NextRequest, NextResponse } from "next/server";
import cloudinary from "@/utils/cloudinary";
import streamifier from "streamifier";

export const POST = async (req: NextRequest, { params }: any) => {
  try {
    await dbConfig();

    let streamUpload = (req: any) => {
      return new Promise((resolve, reject) => {
        let stream = cloudinary.uploader.upload_stream((error, result) => {
          if (result) {
            resolve(result);
          } else {
            reject(error);
          }
        });

        streamifier.createReadStream(req.file.buffer).pipe(stream);
      });
    };
    const uploads = async (req: any) => {
      let result = await streamUpload(req);
      return result;
    };
    const { secure_url }: any = await uploads(req);

    console.log(secure_url);

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
