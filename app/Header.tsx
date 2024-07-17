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
      <div className="flex justify-between items-center my-2 mx-4 md:mx-10  py-3">
        <div className="flex justify-between  w-full  gap-6 items-center">
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
