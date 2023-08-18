import prismadb from "@/lib/prismadb";

export const getNormalSummaryCount = async (clientId: string) => {
  const norSumCount = await prismadb.normalSummary.count({
    where: {
      clientId,
    },
  });

  return norSumCount;
};
