import myAdminModel from "@/utils/model/adminModel";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { dbConfig } from "@/utils/dbConfig";

export const POST = async (req: NextRequest) => {
  try {
    await dbConfig();
    const { name, email, password } = await req.json();

    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(password, salt);
    const getD = await myAdminModel.create({
      name,
      email,
      password: hashed,
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

export const GET = async (req: NextRequest) => {
  try {
    const getD = await myAdminModel.find();
    return NextResponse.json({
      message: "Users Found",
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
