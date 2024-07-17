"use client";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";
import { MdCancel } from "react-icons/md";

const Head = () => {
  return (
    <div>
      <div className="flex justify-between items-center p-1 mb-3">
        <div>
          <h1 className="font-bold text-[14px]">Create Blog Post</h1>
        </div>
        <Link href={"/"}>
          <MdCancel />
        </Link>
      </div>
    </div>
  );
};

export default Head;
