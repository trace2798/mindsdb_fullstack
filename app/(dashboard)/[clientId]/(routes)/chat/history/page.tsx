import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card";
  import { Label } from "@/components/ui/label";
  import prismadb from "@/lib/prismadb";
  
  const page = async ({ params }: { params: { clientId: string } }) => {
    const questions = await prismadb.ask.findMany({
      where: {
        clientId: params.clientId,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    return (
      <>
        <div className="grid gap-4 mt-8 overflow-hidden lg:grid-cols-2 xl:grid-cols-4 h-fit ">
          {questions.map((question, index) => (
            <>
              <div key={index} className="">
                <Card>
                  <CardHeader>
                    <CardTitle>Input Text</CardTitle>
                    <CardDescription className="normal-case line-clamp-2">
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
    );
  };
  
  export default page;
  