import connect from "@/lib/connect-mind";
import prismadb from "@/lib/prismadb";
import MindsDB from "mindsdb-js-sdk";
import { NextResponse } from "next/server";

interface ResponseData {
  sentiment: string;
  text: string;
}

export async function GET(req: Request) {
  try {
    const toAnalyze = await prismadb.feedback.findMany({
      where: {
        analysis: "null",
      },
    });

    await connect();
    const model = await MindsDB.Models.getModel(
      "sentiment_classifier_model",
      "sentiment_analysis"
    );

    await Promise.all(
      toAnalyze.map(async (item) => {
        const message = item.message;
        const queryOptions = {
          where: [`review = "${message}"`],
        };

        const response = await model?.query(queryOptions);
        const data = response?.data as ResponseData;

        
        await prismadb.feedback.update({
          where: { id: item.id },
          data: { analysis: data.sentiment },
        });
      })
    );
    return NextResponse.json(`${toAnalyze.length} Feedback Analyzed`);
  } catch (error) {
    return new NextResponse("Internal error", { status: 500 });
  }
}
