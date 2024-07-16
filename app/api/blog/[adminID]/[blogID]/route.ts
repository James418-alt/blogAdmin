import { dbConfig } from "@/utils/dbConfig";
import myAdminModel from "@/utils/model/adminModel";
import myBlogModel from "@/utils/model/blogsModel";
import { NextRequest, NextResponse } from "next/server";

export const DELETE = async (req: NextRequest, { params }: any) => {
  try {
    await dbConfig();
    const { blogID, adminID } = await params;
    const admin = await myAdminModel.findById(adminID);
    const getD = await myBlogModel.findByIdAndDelete(blogID);
    admin.blogs.pull(getD);
    admin.save();
    return NextResponse.json({
      message: "Blog deleted",
      status: 200,
      data: getD,
    });
  } catch (error: any) {
    return NextResponse.json({
      messae: "Error Occured!",
      status: 400,
      error: error.message,
    });
  }
};
