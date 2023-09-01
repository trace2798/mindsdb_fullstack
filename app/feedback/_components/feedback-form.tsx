"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import * as z from "zod";

const formSchema = z.object({
  name: z.string().min(2),
  message: z.string().min(5),
});

interface FeedbackFormProps {}

export const FeedbackForm: React.FC<FeedbackFormProps> = ({}) => {
  const router = useRouter();
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      message: "",
    },
  });

  type FormData = z.infer<typeof formSchema>;

  const onSubmit: SubmitHandler<FormData> = async (values) => {
    try {
      await axios.post(`/api/feedback`, values);
      form.reset();
      toast({
        title: "Feedback successfully submitted",
        description: "Thank you for your feedback.",
        variant: "default",
      });
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response?.status === 429) {
          return toast({
            title: "Too many request.",
            description: "Try in an hour.",
            variant: "default",
          });
        }
      } else {
        console.error(error);
        toast({
          title: "Failed to submit feedback",
          description: "Make sure all fields are filled up.",
          variant: "destructive",
        });
      }
    }
  };

  const isLoading = form.formState.isSubmitting;

  return (
    <>
      <div className="">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col w-full max-w-lg grid-cols-12 gap-2 px-2 py-4 mt-5 border rounded-lg md:px-4 focus-within:shadow-sm"
          >
            <FormLabel className="text-xl">Feedback Form</FormLabel>
            <FormMessage className="text-primary">
              Data collected for sentimental analysis of feedback
            </FormMessage>
            <FormLabel className="mt-3">Name</FormLabel>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Your name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormLabel className="mt-3">Message</FormLabel>
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea placeholder="Your feedback/message" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="mt-5 w-fit"
              disabled={isLoading || !form.formState.isValid}
            >
              Submit
            </Button>
          </form>
        </Form>
        <Button
          onClick={() => router.push("/")}
          className="w-full mt-10"
          variant="ghost"
        >
          Back Home
        </Button>
      </div>
    </>
  );
};
