"use client";

import * as z from "zod";
import axios from "axios";
import { MessageSquare } from "lucide-react";
import { useForm } from "react-hook-form";
import { useState } from "react";
// import { toast } from "react-hot-toast";
import { useParams, useRouter } from "next/navigation";
// import { ChatCompletionRequestMessage } from "openai";

import { BotAvatar } from "@/components/bot-avatar";
import { Heading } from "@/components/heading";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { Loader } from "@/components/loader";
import { UserAvatar } from "@/components/user-avatar";
import { Empty } from "@/components/ui/empty";
// import { useProModal } from "@/hooks/use-pro-modal";

import { formSchema } from "../constants";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";

type MindsDBResponse = {
  text: string;
  response: string;
};

const ConversationForm = ({}) => {
  const router = useRouter();
  //   const proModal = useProModal();
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
    } catch (error: any) {
      // console.log(error);
    }
  };

  //   const onSubmit = async (values: z.infer<typeof formSchema>) => {
  //     try {
  //       const userMessage: MindsDBResponse = {
  //         text: values.text,
  //         response: values.text,
  //       };
  //       const newMessages = [...messages, userMessage];

  //       const responseBack = await axios.post(
  //         `/api/${params.clientId}/conversation`,
  //         {
  //           messages: newMessages,
  //         }
  //       );
  //       const response = responseBack.data;
  //       setMessages((current) => [...current, userMessage, response.data]);

  //     } catch (error: any) {
  //       if (error?.response?.status === 403) {
  //         // proModal.onOpen();
  //       } else {
  //         // toast.error("Something went wrong.");
  //       }
  //     } finally {
  //       router.refresh();
  //     }
  //   };

  return (
    <div>
      <Heading
        title="Ask Turbo"
        description="Ask a question."
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
                        placeholder="How do I calculate the radius of a circle?"
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
            <Empty label="No conversation started." />
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
