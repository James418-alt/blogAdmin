"use client";
import { Button } from "@/components/ui/button";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";
import { MdAdd, MdSearch } from "react-icons/md";

const Header = () => {
  return (
    <div>
      <div className="flex justify-between items-center shadow-sm mx-8 py-3 px-1">
        <div className="flex justify-between w-[400px] items-center gap-1  border border-gray-500 px-4 py-2 rounded-full">
          <input
            className="w-[100%] outline-none p-1 col-span-2 "
            type="text"
          />
          <MdSearch className="font-bold text-[20px] col-span-1" />
        </div>

        <div className="flex gap-6 items-center">
          <div>
            <div>
              <Link
                href={"/create"}
                className="p-2 border flex gap-1 rounded-md items-center"
              >
                <MdAdd className="font-bold text-[18px]" />
                <p>New Blog</p>
              </Link>
            </div>
          </div>
          <div>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
