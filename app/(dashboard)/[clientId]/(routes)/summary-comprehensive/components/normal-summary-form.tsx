"use client";
import { Heading } from "@/components/heading";
import { Loader } from "@/components/loader";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useParams } from "next/navigation";
import { FC, useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

interface pageProps {}

const formSchema = z.object({
  text: z.string().min(4),
});

type MindsDBResponse = {
  text: string;
  response: string;
};

const NormalSummaryForm: FC<pageProps> = ({}) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      text: "",
    },
  });
  const [messages, setMessages] = useState<MindsDBResponse[]>([]);
  const isLoading = form.formState.isSubmitting;
  const params = useParams();
  const { toast } = useToast();
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const responseBack = await axios.post(
        `/api/${params.clientId}/normal-summary`,
        values
      );

      const response = responseBack.data;

      setMessages((messages) => [responseBack.data, ...messages]);
      form.reset();
      toast({
        title: "Summarized",
        description: "Your input has been summarized by gpt-3.5-turbo",
      });
    } catch (error: any) {
      toast({
        title: "Oops Something went wrong",
      });
    }
  };

  return (
    <>
      <div className="px-4 mt-10 lg:px-8">
        <Heading
          title="Summarize (Normal)"
          description="Provide text to get a summary."
          buttonTitle="Check Past Summaries"
          tokenCountInfo="Each request is counted as 2 token"
        />
        <div className="flex flex-col md:flex-row">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col w-full gap-2 p-4 px-3 space-y-4 border rounded-lg md:w-1/2 md:px-6 focus-within:shadow-sm"
            >
              <FormField
                name="text"
                render={({ field }) => (
                  <FormItem className="col-span-12">
                    <FormControl className="pl-2 m-0">
                      <Textarea
                        className="border focus-visible:ring-0 focus-visible:ring-transparent"
                        disabled={isLoading}
                        placeholder="Enter your text you want to summarize."
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <Button
                className="w-full col-span-12 lg:col-span-2"
                type="submit"
                disabled={isLoading}
                size="icon"
              >
                Summarize
              </Button>
            </form>
          </Form>
          {isLoading && (
            <div className="flex items-center justify-center w-full p-3 mt-5 rounded-lg md:mt-0 md:ml-5 md:w-5/6 w-fill bg-muted">
              <Loader description="Your input is getting summarize." />
            </div>
          )}
        </div>
        <div className="grid w-full grid-cols-1 gap-4 mt-8 overflow-hidden h-fit ">
          {messages.map((url, index) => (
            <>
              <div key={index} className="flex flex-row">
                <Card className="overflow-hidden rounded-lg ">
                  <CardHeader>
                    <CardTitle>Input Text</CardTitle>
                    <CardDescription className="normal-case">
                      {url.text}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="">
                    <Label className="text-2xl font-semibold leading-none tracking-tight">
                      Summary
                    </Label>
                    <div className="relative min-w-[290px] md:w-fit mt-2">
                      <h1 className="text-zinc-600 dark:text-zinc-300">
                        {url.response}
                      </h1>
                    </div>
                  </CardContent>
                  <CardFooter className="p-2"></CardFooter>
                </Card>
              </div>
            </>
          ))}
        </div>
      </div>
    </>
  );
};

export default NormalSummaryForm;
