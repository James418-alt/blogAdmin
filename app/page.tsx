import { AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar } from "@radix-ui/react-avatar";
import Image from "next/image";

export default function Home() {
  const formAction = async (formData: FormData) => {
    const image = formData.get("image");
    console.log(image);
  };
  return (
    <div className="grid grid-cols-4">
      <div className="col-span-1">
        <Card className="bg-green-500">
          <CardHeader>
            <div className="flex flex-col gap-1">
              <Avatar>
                <div>
                  {" "}
                  <AvatarImage
                    className="h-[30px] w-[30px] rounded-full border"
                    src="/next.svg"
                  />
                </div>
              </Avatar>
              <CardTitle>
                <h1 className="font-semibold text-[15px]">James Gomenti</h1>
              </CardTitle>
              <CardDescription>
                <p className="font-normal text-gray-500 text-[10px]">
                  Writter/Author
                </p>
              </CardDescription>
            </div>
            <div>
              <div className="flex justify-between items-center gap-4 w-[70%]">
                <Badge
                  className="rounded-sm border-gray-400 "
                  variant={"secondary"}
                >
                  Algorithms
                </Badge>
                <Badge
                  className="rounded-sm border-gray-400"
                  variant={"secondary"}
                >
                  Algorithms
                </Badge>
              </div>
            </div>
          </CardHeader>

          {/* <CardContent>
            <Image src={"/next.svg"} alt="#" width={100} height={100}></Image>
          </CardContent> */}
          <CardFooter>
            <div className="flex justify-between gap-8 w-full">
              <p className="font-semibold text-[12px]">
                32 <span className="text-gray-500">Total Posts</span>
              </p>
              <p className="font-semibold text-[12px]">
                23K <span className="text-gray-500">Subsribers</span>
              </p>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
