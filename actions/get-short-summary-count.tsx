import prismadb from "@/lib/prismadb";

export const getShortSummaryCount = async (clientId: string) => {
  const shortSumCount = await prismadb.shortSummary.count({
    where: {
      clientId,
    },
  });

  return shortSumCount;
};
