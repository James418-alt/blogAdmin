import { Button } from "@/components/ui/button";
import cloudinary from "@/utils/cloudinary";
import { redirect } from "next/navigation";
import React from "react";
import { MdCancel, MdImage } from "react-icons/md";
import Head from "./head";
import { currentUser } from "@clerk/nextjs/server";

const page = async () => {
  const user = await currentUser();
  const Id = user?.publicMetadata.userId;

  const url = `https://blog-admin-rho-swart.vercel.app/api/admin/${Id}`;
  const res = await fetch(url, { method: "GET", cache: "no-cache" });
  const data = await res.json();

  const formAction = async (formData: FormData) => {
    "use server";
    const title = formData.get("title");
    const desc = formData.get("desc");
    const image = formData.get("image") as File;
    const adminID = formData.get("adminID");
    // console.log(adminID);

    const urls = `https://blog-admin-rho-swart.vercel.app/api/blog/${adminID}`;

    const file = await image.arrayBuffer();
    const buffer = new Uint8Array(file);

    const { secure_url }: any = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream({}, (err, data) => {
          if (err) {
            return reject(err);
          } else {
            return resolve(data);
          }
        })
        .end(buffer);
    });
    await fetch(urls, {
      method: "POST",
      body: JSON.stringify({ title, desc, coverImage: secure_url }),
    }).then(() => {
      console.log("Done");
      redirect("/");
    });
  };
  return (
    <div className="flex items-center justify-center mt-10">
      <div className="md:w-[400px] w-[300px] min-h-[300px] border p-2 shadow-md">
        <Head />
        <form action={formAction}>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <label className="text-[12px] font-semibold">Blog Title</label>
              <input
                type="text"
                placeholder="Enter your Blog title"
                className="placeholder:text-[12px] text-[12px] border p-1 rounded-sm outline-none "
                name="title"
              />
            </div>

            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-5">
                {" "}
                <label className="text-[12px] font-semibold">
                  Blog Description
                </label>
                <label htmlFor="image">
                  <MdImage />
                </label>
              </div>

              <textarea
                placeholder="Write an Amazing Blog!"
                className="text-[12px] placeholder:text-[12px] border p-1 rounded-sm outline-none min-h-[140px] "
                name="desc"
              ></textarea>
              <input name="image" id="image" type="file" className="hidden" />
              <input
                name="adminID"
                type="text"
                value={data.data._id}
                className="hidden"
              />
            </div>
            <div className="flex justify-center items-center">
              <Button>Post Blog</Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default page;
