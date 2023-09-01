import { FC } from "react";
import ImageForm from "./components/image-form";
import prismadb from "@/lib/prismadb";
import { Separator } from "@/components/ui/separator";
import { Empty } from "@/components/ui/empty";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import { randomUUID } from "crypto";

interface ImagePage {}

const ImagePage = async ({ params }: { params: { clientId: string } }) => {
  const images = await prismadb.image.findMany({
    where: {
      clientId: params.clientId,
    },
    orderBy: {
      createdAt: "desc",
    },
    take: 3,
  });
  return (
    <>
      <ImageForm />
      <Separator className="my-5" />
      <div className="mx-[5vw]">
        <Card className="mt-5 text-red-600 border-none w-fit">
          <CardHeader>
            <CardTitle>Note</CardTitle>
            <CardDescription>
              If image is not visible, it is because the validity of the image
              url is 1 hr after getting generated.
            </CardDescription>
          </CardHeader>
        </Card>
        {images.length === 0 ? (
          <Empty label="No summary found" />
        ) : (
          <>
            <h1 className="font-semibold">
              Your last {images.length < 3 ? images.length : 3} generation
            </h1>
            <div className="grid w-full grid-cols-1 gap-4 my-10 mt-8 overflow-hidden md:grid-cols-2 lg:grid-cols-3 h-fit">
              {images.map((image, index) => (
                <>
                  <div key={index} className="">
                    <Card>
                      <CardHeader>
                        <CardTitle>Input Text</CardTitle>
                        <CardDescription className="normal-case">
                          {image.text}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <Label className="text-2xl font-semibold leading-none tracking-tight">
                          Summary
                        </Label>
                        <div className="relative min-w-[290px] md:w-fit mt-2">
                          <Image
                            src={image.image_url}
                            alt={randomUUID()}
                            width={300}
                            height={300}
                          />
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </>
              ))}
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default ImagePage;
