import myAdminModel from "@/utils/model/adminModel";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { dbConfig } from "@/utils/dbConfig";
import path from "path";

export const POST = async (req: NextRequest) => {
  try {
    await dbConfig();
    const { name, email } = await req.json();

    const getD = await myAdminModel.create({
      name,
      email,
      role: "admin",
    });
    return NextResponse.json({
      message: "Admin Created",
      status: 200,
      data: getD,
    });
  } catch (error: any) {
    return NextResponse.json({
      mesage: "Error Occured",
      status: 400,
      error: error.message,
    });
  }
};
