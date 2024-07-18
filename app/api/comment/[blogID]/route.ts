import { dbConfig } from "@/utils/dbConfig";
import myBlogModel from "@/utils/model/blogsModel";
import myComment from "@/utils/model/commentModel";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest, { params }: any) => {
  try {
    await dbConfig();
    const { comment } = await req.json();
    const { blogID } = await params;
    const blog = await myBlogModel.findById(blogID);
    const getD = await myComment.create({ comment, blog });
    blog.comments.push(getD._id);
    blog.save();
    return NextResponse.json({
      message: "Comment created",
      status: 200,
      data: getD,
    });
  } catch (error: any) {
    return NextResponse.json({
      message: "Error Occured",
      status: 400,
      error: error.message,
    });
  }
};
