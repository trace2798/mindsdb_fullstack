import prismadb from "@/lib/prismadb";

export const getAskCount = async (clientId: string) => {
  const askCount = await prismadb.ask.count({
    where: {
      clientId,
    },
  });

  return askCount;
};
