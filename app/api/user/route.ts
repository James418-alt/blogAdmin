import myAdminModel from "@/utils/model/adminModel";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { dbConfig } from "@/utils/dbConfig";
import myUserModel from "@/utils/model/userModel";
import { AnyNaptrRecord } from "dns";

export const POST = async (req: NextRequest) => {
  try {
    await dbConfig();
    const { name, email, password } = await req.json();

    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(password, salt);
    const getD = await myUserModel.create({
      name,
      email,
      password: hashed,
      role: "user",
    });
    return NextResponse.json({
      message: "user Created",
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
    await dbConfig();
    const getD = await myUserModel.find();
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
