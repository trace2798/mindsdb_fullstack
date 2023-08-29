import { NextResponse } from "next/server";
import MindsDB from "mindsdb-js-sdk";
import connect from "@/lib/connect-mind";
import { auth } from "@clerk/nextjs";
import prismadb from "@/lib/prismadb";
import { incrementApiLimitImage } from "@/lib/api-limit";

interface ResponseData {
  img_url: string;
  text: string;
}

export async function POST(
  req: Request,
  { params }: { params: { clientId: string } }
) {
  try {
    const { userId } = auth();
    const body = await req.json();
    const { text } = body;
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    if (!params.clientId) {
      return new NextResponse("User id is required", { status: 400 });
    }
    await connect();
    const model = await MindsDB.Models.getModel(
      "dalle_real_natural",
      "images_generation"
    );
    const queryOptions = {
      where: [`text = "${text}"`],
    };
    const response = await model?.query(queryOptions);
    const data = response?.data as ResponseData;
    await incrementApiLimitImage();
    await prismadb.image.create({
      data: { clientId: params.clientId, text: text, image_url: data.img_url },
    });
    return NextResponse.json(response?.data);
  } catch (error) {
    // console.log("[IMAGE_ERROR]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
