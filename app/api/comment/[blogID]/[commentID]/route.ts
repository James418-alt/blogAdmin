import { dbConfig } from "@/utils/dbConfig";
import myBlogModel from "@/utils/model/blogsModel";
import myComment from "@/utils/model/commentModel";
import { NextRequest, NextResponse } from "next/server";

export const DELETE = async (req: NextRequest, { params }: any) => {
  try {
    await dbConfig();
    const { blogID, commentID } = await params;
    const blog = await myBlogModel.findById(blogID);
    const getD = await myComment.findByIdAndDelete(commentID);
    blog.comments.pull(getD);
    blog.save();
    return NextResponse.json({
      message: "Comment Deleted",
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
