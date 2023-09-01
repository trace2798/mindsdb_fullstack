import { FC } from "react";
import AnalyzeButton from "./_components/analyzeButton";
import prismadb from "@/lib/prismadb";

interface pageProps {}

const page: FC<pageProps> = async ({}) => {
  const toAnalyze = await prismadb.feedback.findMany({
    where: {
      analysis: "null",
    },
  });
  console.log(toAnalyze, "To Analyze");
  return (
    <>
      <div>Feedback Analysis page</div>
      <h1>To Analyze: {toAnalyze.length}</h1>
    </>
  );
};

export default page;
