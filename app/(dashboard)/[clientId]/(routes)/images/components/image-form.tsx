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
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { Download } from "lucide-react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

interface pageProps {}

const formSchema = z.object({
  text: z.string().min(4).max(500),
});

type MindsDBResponse = {
  text: string;
  img_url: string;
};

const ImageForm = ({}) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      text: "",
    },
  });
  const [photos, setPhotos] = useState<MindsDBResponse[]>([]);
  const isLoading = form.formState.isSubmitting;

  const params = useParams();
  const { toast } = useToast();
  const router = useRouter();

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const response = await axios.post(
        `/api/${params.clientId}/image`,
        values
      );
      const img_url = response.data;
      setPhotos((photos) => [response.data, ...photos]);
      form.reset();
      router.refresh();
      toast({
        title: "Image Generated",
        description: "Image based on your input has been generated",
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
        <div className="w-full">
          <Heading
            title="Generate Image"
            description="Provide a input to generate image. For best result try to be as descriptive as possible."
            buttonTitle="Check past generations"
            tokenCountInfo="Each request is counted as 4 token"
          />
        </div>

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
                      <Input
                        className="border outline-none focus-visible:ring-0 focus-visible:ring-transparent"
                        disabled={isLoading}
                        placeholder="A picture of a deserted town"
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
          {isLoading && (
            <div className="flex items-center justify-center w-full p-3 mt-5 rounded-lg md:mt-0 md:ml-5 md:w-5/6 w-fill bg-muted">
              <Loader description="Your image is getting generated." />
            </div>
          )}
        </div>
        <div className="flex flex-col flex-wrap justify-center w-full gap-4 mt-8 overflow-hidden md:justify-evenly md:flex-row ">
          {photos.map((url, index) => (
            <>
              <div key={index} className="flex flex-row">
                <Card className="overflow-hidden rounded-lg">
                  <CardHeader>
                    <CardTitle>Text</CardTitle>
                    <CardDescription className="max-w-lg capitalize">
                      {url.text}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="">
                    <div className="relative aspect-square min-w-[290px] md:w-[500px]">
                      <Image
                        fill
                        alt="Generated"
                        src={url.img_url}
                        className="rounded-lg"
                      />
                    </div>
                  </CardContent>
                  <CardFooter className="p-2">
                    <Button
                      onClick={() => window.open(url.img_url)}
                      variant="secondary"
                      className="w-full"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Download
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </>
          ))}
        </div>
      </div>
    </>
  );
};

export default ImageForm;
