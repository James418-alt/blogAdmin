import { dbConfig } from "@/utils/dbConfig";
import myAdminModel from "@/utils/model/adminModel";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest, { params }: any) => {
  try {
    await dbConfig();
    const { adminID } = await params;
    const getD = await myAdminModel.findById(adminID);

    return NextResponse.json({
      message: "Users Found",
      status: 200,
      data: getD,
    });
  } catch (error: any) {
    return NextResponse.json({
      mesage: "Error Xup",
      status: 400,
      error: error.message,
    });
  }
};
