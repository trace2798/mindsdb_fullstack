import prismadb from "@/lib/prismadb";
import { FC } from "react";

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
      <div>
        {images.map((image, index) => (
          <>
            <h1 key={index}>{image.text}</h1>
          </>
        ))}
      </div>
    </>
  );
};

export default page;
