import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import prismadb from "@/lib/prismadb";

interface pageProps {}

const page = async ({ params }: { params: { clientId: string } }) => {
  const images = await prismadb.image.findMany({
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
        {images.map((image, index) => (
          <>
            <div key={index} className="">
              <Card>
                <CardHeader>
                  <CardTitle>Input Text</CardTitle>
                  <CardDescription className="capitalize">
                    {image.text}
                  </CardDescription>
                </CardHeader>
                {/* <CardContent>
                  <Label className="text-2xl font-semibold leading-none tracking-tight">
                    Summary
                  </Label>
                  <div className="relative min-w-[290px] md:w-fit mt-2">
                    <Image
                      fill
                      alt="Generated"
                      src={image.image_url}
                      className="rounded-lg"
                    />
                  </div>
                </CardContent> */}
              </Card>
            </div>
          </>
        ))}
      </div>
    </>
  );
};

export default page;
