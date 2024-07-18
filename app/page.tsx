"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useUser } from "@clerk/nextjs";
import { User, currentUser } from "@clerk/nextjs/server";

import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import React, { useEffect, useState } from "react";
import { MdAdd, MdComment, MdEdit } from "react-icons/md";

const page = () => {
  const [data, setData]: any = useState({});
  const [data2, setData2]: any = useState({});
  const { isLoaded, isSignedIn, user } = useUser();
  const [show, setShow] = useState(false);
  const userId = user?.publicMetadata?.userId!;
  const [num, setNum] = useState(5);

  const url = `http://localhost:3000/api/admin/${userId}`;
  const url2 = `http://localhost:3000/api/blog/${userId}`;

  const getD = async () => {
    return await fetch(url, {
      method: "GET",
      cache: "no-cache",
    }).then((res) => {
      return res.json();
    });
  };

  const getDs = async () => {
    return await fetch(`http://localhost:3000/api/blog/${userId}`, {
      method: "GET",
      cache: "no-cache",
    }).then((res) => {
      return res.json();
    });
  };

  useEffect(() => {
    getD().then((res: any) => {
      setData(res.data);
    });
    getDs().then((res: any) => {
      setData2(res.data);
    });
  }, [isLoaded]);

  if (!isLoaded)
    return (
      <div className="w-full h-screen fixed top-0 z-[999999999999] flex justify-center items-center">
        <div className="loader" />
      </div>
    );
  const clicked = () => {
    setNum(data.blogs.length);
  };
  console.log(num);

  return (
    // <div>hi</div>
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2">
        <Card className="col-span-1 m-3 md:m-10 mt-5">
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 mt-7 gap-3">
              <div className="col-span-1">
                {" "}
                <Card className="min-h-[150px]">
                  <CardHeader>
                    <div className="flex flex-col gap-1">
                      <CardTitle>
                        <h1 className="font-semibold text-[15px]">
                          {data?.name}
                        </h1>
                      </CardTitle>
                      <CardDescription>
                        <p className="font-normal text-gray-500 text-[10px]">
                          Author
                        </p>
                      </CardDescription>
                      <CardDescription className="mt-10">
                        <div className="flex justify-between gap-3">
                          <div>
                            <h1 className="text-[12px] font-semibold text-black flex gap-1">
                              {data2?.blogs?.length}{" "}
                              <span className="font-normal text-[10px] text-gray-500">
                                Total Posts
                              </span>
                            </h1>
                          </div>
                        </div>
                      </CardDescription>
                    </div>
                  </CardHeader>
                </Card>
              </div>
              <div className="col-span-1">
                {" "}
                <Card className="min-h-[150px]">
                  <CardHeader>
                    <div className="flex flex-col gap-1">
                      <CardTitle>
                        <h1 className="font-semibold text-[15px]">
                          James Gomenti
                        </h1>
                      </CardTitle>
                      <CardDescription>
                        <p className="font-normal text-gray-500 text-[10px]">
                          Writter/Author
                        </p>
                      </CardDescription>
                    </div>
                  </CardHeader>
                </Card>
              </div>
            </div>
          </CardContent>

          <CardContent>
            <Card className="h-[250px]">
              {" "}
              <div className="flex h-full justify-center items-center">
                <h1>Chart Content Coming soon!!</h1>
              </div>
            </Card>
          </CardContent>
        </Card>
        <Card className="h-[530px] overflow-y-auto m-3 md:m-10 col-span-1">
          <CardHeader>
            <CardTitle>
              <div className="flex justify-between items-center mb-3">
                <h1 className="text-[15px]">
                  {num > 5 ? "" : "Top 5 Recent Blogs"}
                </h1>
                <div
                  onClick={clicked}
                  className="cursor-pointer underline text-[12px] font-normal text-gray-500"
                >
                  View All Blogs
                </div>
              </div>
            </CardTitle>
            <CardDescription>
              <div className="flex md:h-full flex-col gap-3">
                {data?.blogs?.length === 0 ? (
                  <>
                    <div className="flex justify-center items-center md:h-[350px] w-full">
                      <h1>You don't have any existing Blog😭 </h1>
                    </div>
                  </>
                ) : (
                  <>
                    {data2?.blogs
                      ?.map((el: any) => (
                        <div
                          key={el._id}
                          className="flex md:gap-4 items-center mt-2 border rounded-sm md:p-0 md:border-none p-1 "
                        >
                          <div>
                            <img
                              className="w-[100px] h-[70px] hidden md:block"
                              src={el.coverImage}
                              alt="#"
                            />
                          </div>
                          <div className="cursor-default">
                            <div>
                              <h1 className="font-semibold text-[13px] text-gray-600">
                                {el.title}
                              </h1>
                            </div>
                            <div className="flex w-[300px] md:w-[200px] justify-between items-center mt-1">
                              <div className="flex gap-1 items-center">
                                <MdComment />
                                <p className="font-normal text-gray-400 text-[12px]">
                                  {el.comments.length}{" "}
                                  {el.comments.length <= 1
                                    ? "Comment"
                                    : "Comments"}
                                </p>
                              </div>
                              <div className="flex gap-1 items-center">
                                <MdEdit />
                                <p className="font-normal text-gray-400 text-[12px]">
                                  Edit
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))
                      .reverse()
                      .splice(0, num)}
                  </>
                )}
              </div>
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    </div>
  );
};

export default page;
