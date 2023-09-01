import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Empty } from "@/components/ui/empty";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import prismadb from "@/lib/prismadb";
import NormalSummaryForm from "./components/normal-summary-form";

const NormalSummaryPage = async ({
  params,
}: {
  params: { clientId: string };
}) => {
  const summaries = await prismadb.normalSummary.findMany({
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
      <NormalSummaryForm />
      <Separator className="my-5" />
      <div className="mx-[5vw]">
        {summaries.length === 0 ? (
          <Empty label="No summary found" />
        ) : (
          <>
            <h1 className="font-semibold">
              Your last {summaries.length < 3 ? summaries.length : 3} generation
            </h1>
            <div className="grid w-full grid-cols-1 gap-4 my-10 mt-8 overflow-hidden h-fit">
              {summaries.map((summary, index) => (
                <>
                  <div key={index} className="">
                    <Card>
                      <CardHeader>
                        <CardTitle>Input Text</CardTitle>
                        <CardDescription className="normal-case">
                          {summary.text}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <Label className="text-2xl font-semibold leading-none tracking-tight">
                          Summary
                        </Label>
                        <div className="relative min-w-[290px] md:w-fit mt-2">
                          <h1 className="text-zinc-600 dark:text-zinc-300">
                            {summary.summary}
                          </h1>
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

export default NormalSummaryPage;
