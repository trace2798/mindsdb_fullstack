import { NextResponse } from "next/server";
import MindsDB from "mindsdb-js-sdk";

import { auth } from "@clerk/nextjs";
import { checkApiLimit, incrementApiLimitShortSummary } from "@/lib/api-limit";
import connect from "@/lib/connect-mind";
import prismadb from "@/lib/prismadb";

interface ResponseData {
  response: string;
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

    const freeTrial = await checkApiLimit();
    if (!freeTrial) {
      return new NextResponse("You have finished your limit.", { status: 403 });
    }
    await connect();


    const model = await MindsDB.Models.getModel(
      "summarize_gpt_4_short",
      "summarize"
    );
    const queryOptions = {
      where: [`from_user" = "Trace"`] && [`text = "${text}"`],
    };

    const response = await model?.query(queryOptions);
    await incrementApiLimitShortSummary();
    const data = response?.data as ResponseData;
    await prismadb.shortSummary.create({
      data: { clientId: params.clientId, text: text, summary: data.response },
    });
    return NextResponse.json(response?.data);
  } catch (error) {
    
    return new NextResponse("Internal Error", { status: 500 });
  }
}
