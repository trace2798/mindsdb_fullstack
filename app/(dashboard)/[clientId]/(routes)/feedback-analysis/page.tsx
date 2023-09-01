import prismadb from "@/lib/prismadb";
import { FC } from "react";
import Chart from "./_components/chart";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface pageProps {}

const page: FC<pageProps> = async ({}) => {
  const positiveAnalyze = await prismadb.feedback.count({
    where: {
      analysis: "positive",
    },
  });
  const neutralAnalyze = await prismadb.feedback.count({
    where: {
      analysis: "neutral",
    },
  });
  const negativeAnalyze = await prismadb.feedback.count({
    where: {
      analysis: "negative",
    },
  });
  const totalFeedback = await prismadb.feedback.count();
  const toAnalyze = await prismadb.feedback.count({
    where: {
      analysis: "null",
    },
  });
  return (
    <>
      <div className="flex flex-col justify-center min-h-[90vh] items-center">
        <h1 className="text-xl font-semibold">Feedback Sentiment Analysis</h1>
        <div className=" mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full gap-2">
          <Card>
            <CardHeader>
              <CardTitle>Total Feedback</CardTitle>
              <CardDescription className="text-center text-xl">
                {totalFeedback}
              </CardDescription>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="capitalize">Amount analyzed</CardTitle>
              <CardDescription className="text-center text-xl">
                {totalFeedback - toAnalyze}
              </CardDescription>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>To Analyze</CardTitle>
              <CardDescription className="text-center text-xl">
                {toAnalyze}
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
        <Chart
          negativeAnalyze={negativeAnalyze}
          neutralAnalyze={neutralAnalyze}
          positiveAnalyze={positiveAnalyze}
        />
      </div>
    </>
  );
};

export default page;
