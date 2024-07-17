import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import Image from "next/image";
import { redirect } from "next/navigation";
import React from "react";
import { MdAdd, MdComment, MdEdit } from "react-icons/md";

const page = async () => {
  //blog-admin-rho-swart.vercel.app/
  const url = "https://blog-admin-rho-swart.vercel.app/api/admin";
  const res = await fetch(url, { cache: "no-cache" });
  const data = await res.json();

  const url2 = `https://blog-admin-rho-swart.vercel.app/api/blog/${data.data[0]._id}`;
  const res2 = await fetch(url2, { cache: "no-cache" });
  const data2 = await res2.json();
  console.log(data2.data);

  return (
    <div>
      <h1 className="font-semibold mx-3 text-[18px] text-gray-500 md:mx-10 my-2">
        Welcome Back Gomenti!
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2">
        <Card className="col-span-1 m-3 md:m-10">
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 mt-7 gap-3">
              <div className="col-span-1">
                {" "}
                <Card className="min-h-[150px]">
                  <CardHeader>
                    <div className="flex flex-col gap-1">
                      <CardTitle>
                        <h1 className="font-semibold text-[15px]">
                          {data.data[0].name}
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
                              {data.data[0].blogs.length}{" "}
                              <span className="font-normal text-[10px] text-gray-500">
                                Total Posts
                              </span>
                            </h1>
                          </div>
                          <div>
                            <h1 className="text-[12px] font-semibold text-black flex gap-1">
                              13K{" "}
                              <span className="font-normal text-[10px] text-gray-500">
                                Total Likes
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
        <Card className="h-[500px] m-3 md:m-10 col-span-1">
          <CardHeader>
            <CardTitle>
              <div className="flex justify-between items-center mb-3">
                <h1 className="text-[15px]">Top 5 Recent Blogs</h1>
              </div>
            </CardTitle>
            <CardDescription>
              <div className="flex flex-col gap-3">
                {data2.data.blogs.map((el: any) => (
                  <div
                    key={el._id}
                    className="flex md:gap-4 items-center mt-2 "
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
                      <div className="flex w-[200px] justify-between items-center mt-1">
                        <div className="flex gap-1 items-center">
                          <MdComment />
                          <p className="font-normal text-gray-400 text-[12px]">
                            {el.comments.length}{" "}
                            {el.comments.length <= 1 ? "Comment" : "Comments"}
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
                ))}
              </div>
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    </div>
  );
};

export default page;
