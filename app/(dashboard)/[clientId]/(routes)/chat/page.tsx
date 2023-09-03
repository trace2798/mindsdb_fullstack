import prismadb from "@/lib/prismadb";
import ConversationForm from "./components/chat-form";
import { Empty } from "@/components/ui/empty";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

const ConversationPage = async ({
  params,
}: {
  params: { clientId: string };
}) => {
  const questions = await prismadb.ask.findMany({
    where: {
      clientId: params.clientId,
    },
    orderBy: {
      createdAt: "desc",
    },
    take: 3,
  });
  return (
    <div>
      <ConversationForm />
      <Separator className="my-5" />
      <div className="mx-[5vw]">
        {questions.length === 0 ? (
          <Empty label="No summary found" />
        ) : (
          <>
            <h1 className="font-semibold">
              Your last {questions.length < 3 ? questions.length : 3} questions
            </h1>
            <div className="grid w-full grid-cols-1 gap-4 my-10 mt-8 overflow-hidden h-fit">
              {questions.map((question, index) => (
                <>
                  <div key={index} className="">
                    <Card>
                      <CardHeader>
                        <CardTitle>Input Question</CardTitle>
                        <CardDescription className="normal-case">
                          {question.text}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <Label className="text-2xl font-semibold leading-none tracking-tight">
                          Answer
                        </Label>
                        <div className="relative min-w-[290px] md:w-fit mt-2">
                          <h1 className="text-zinc-600 dark:text-zinc-300">
                            {question.summary}
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
    </div>
  );
};

export default ConversationPage;
