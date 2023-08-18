import prismadb from "@/lib/prismadb";

export const getImageCount = async (clientId: string) => {
  const imageCount = await prismadb.image.count({
    where: {
      clientId,
    },
  });

  return imageCount;
};
