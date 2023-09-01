import prismadb from "@/lib/prismadb";

export const getAskTurboCount = async (clientId: string) => {
  const askCount = await prismadb.askTurbo.count({
    where: {
      clientId,
    },
  });

  return askCount;
};
