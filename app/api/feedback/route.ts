import { NextResponse } from "next/server";

import prismadb from "@/lib/prismadb";
import connect from "@/lib/connect-mind";
import MindsDB from "mindsdb-js-sdk";

// interface ResponseData {
//   sentiment: string;
//   text: string;
// }

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { name, message } = body;

    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }
    // await connect();
    // const model = await MindsDB.Models.getModel(
    //   "sentiment_classifier_model",
    //   "sentiment_analysis"
    // );

    // const queryOptions = {
    //   where: [`review = "${message}"`],
    // };

    // const response = await model?.query(queryOptions);
    // const data = response?.data as ResponseData;

    await prismadb.feedback.create({
      data: { name: name, message: message, },
    });

    return NextResponse.json("Analysis Done");
  } catch (error) {
    return new NextResponse("Internal error", { status: 500 });
  }
}
