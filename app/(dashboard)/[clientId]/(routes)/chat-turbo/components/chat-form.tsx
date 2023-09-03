"use client";

import axios, { AxiosError } from "axios";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Heading } from "@/components/heading";
import { Loader } from "@/components/loader";
import { Button } from "@/components/ui/button";
import { Empty } from "@/components/ui/empty";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { formSchema } from "../constants";

type MindsDBResponse = {
  text: string;
  response: string;
};

const ConversationForm = ({}) => {
  const { toast } = useToast();
  const router = useRouter();
  const [messages, setMessages] = useState<MindsDBResponse[]>([]);
  const params = useParams();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      text: "",
    },
  });

  const isLoading = form.formState.isSubmitting;
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const responseBack = await axios.post(
        `/api/${params.clientId}/conversation-turbo`,
        values
      );

      const response = responseBack.data;

      setMessages((messages) => [...messages, responseBack.data]);
      form.reset();
      router.refresh();
      toast({
        title: "Answer Generated",
        description: "Answer for your question has been generated",
      });
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response?.status === 403) {
          return toast({
            title: "You are out of token.",
            variant: "destructive",
          });
        }
      } else {
        console.error(error);
        toast({
          title: "Oops something went wrong",
          variant: "destructive",
        });
      }
    }
  };
  return (
    <div>
      <Heading
        title="Ask Turbo"
        description="Ask a question."
        buttonTitle="Check past generations"
        tokenCountInfo="Each request is counted as 2 token"
      />
      <div className="px-4 lg:px-8">
        <div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="grid w-full grid-cols-12 gap-2 p-4 px-3 border rounded-lg md:px-6 focus-within:shadow-sm"
            >
              <FormField
                name="text"
                render={({ field }) => (
                  <FormItem className="col-span-12 lg:col-span-10">
                    <FormControl className="p-0 m-0">
                      <Input
                        className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent"
                        disabled={isLoading}
                        placeholder="Why is the sky blue?"
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
                Generate
              </Button>
            </form>
          </Form>
        </div>
        <div className="mt-4 space-y-4">
          {isLoading && (
            <div className="flex items-center justify-center w-full p-8 rounded-lg bg-muted">
              <Loader description="Your response is being generated" />
            </div>
          )}
          {messages.length === 0 && !isLoading && (
            <Empty label="Ask a question to get started." />
          )}
          <div className="flex flex-col-reverse gap-y-4">
            {messages.map((message, index) => (
              <div key={index} className="flex flex-row">
                <Card className="overflow-hidden rounded-lg ">
                  <CardHeader>
                    <CardTitle>Question</CardTitle>
                    <CardDescription className="normal-case">
                      {message.text}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="">
                    <Label className="text-2xl font-semibold leading-none tracking-tight">
                      Response
                    </Label>
                    <div className="relative min-w-[290px] md:w-fit mt-2">
                      <h1 className="text-zinc-600 dark:text-zinc-300">
                        {message.response}
                      </h1>
                    </div>
                  </CardContent>
                  <CardFooter className="p-2"></CardFooter>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConversationForm;
