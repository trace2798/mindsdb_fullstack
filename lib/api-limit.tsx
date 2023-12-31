import { auth } from "@clerk/nextjs";

import prismadb from "@/lib/prismadb";
import { MAX_FREE_COUNTS } from "@/constants";

export const incrementApiLimitNormalSummary = async () => {
  const { userId } = auth();

  if (!userId) {
    return;
  }

  const userApiLimit = await prismadb.client.findUnique({
    where: { userId: userId },
  });

  if (userApiLimit) {
    await prismadb.client.update({
      where: { userId: userId },
      data: { count: userApiLimit.count + 2 },
    });
  }
};
export const incrementApiLimitAsk = async () => {
  const { userId } = auth();

  if (!userId) {
    return;
  }

  const userApiLimit = await prismadb.client.findUnique({
    where: { userId: userId },
  });

  if (userApiLimit) {
    await prismadb.client.update({
      where: { userId: userId },
      data: { count: userApiLimit.count + 4 },
    });
  }
};

export const incrementApiLimitAskTurbo = async () => {
  const { userId } = auth();

  if (!userId) {
    return;
  }

  const userApiLimit = await prismadb.client.findUnique({
    where: { userId: userId },
  });

  if (userApiLimit) {
    await prismadb.client.update({
      where: { userId: userId },
      data: { count: userApiLimit.count + 2 },
    });
  }
};

export const incrementApiLimitImage = async () => {
  const { userId } = auth();

  if (!userId) {
    return;
  }

  const userApiLimit = await prismadb.client.findUnique({
    where: { userId: userId },
  });

  if (userApiLimit) {
    await prismadb.client.update({
      where: { userId: userId },
      data: { count: userApiLimit.count + 4 },
    });
  }
};

export const incrementApiLimitShortSummary = async () => {
  const { userId } = auth();

  if (!userId) {
    return;
  }

  const userApiLimit = await prismadb.client.findUnique({
    where: { userId: userId },
  });

  if (userApiLimit) {
    await prismadb.client.update({
      where: { userId: userId },
      data: { count: userApiLimit.count + 4 },
    });
  }
};

export const checkApiLimit = async () => {
  const { userId } = auth();

  if (!userId) {
    return false;
  }

  const userApiLimit = await prismadb.client.findUnique({
    where: { userId: userId },
  });

  if (!userApiLimit || userApiLimit.count < MAX_FREE_COUNTS) {
    return true;
  } else {
    return false;
  }
};

// export const checkApiLimit = async () => {
//   const { userId } = auth();

//   if (!userId) {
//     return false;
//   }

//   const userApiLimit = await prismadb.client.findUnique({
//     where: { userId: userId },
//   });

//   if (!userApiLimit) {
//     return true;
//   }

//   // Calculate the difference between the current date and the createdAt date in days
//   const daysSinceCreated = Math.round(
//     (new Date().getTime() - new Date(userApiLimit.createdAt).getTime()) /
//       (1000 * 60 * 60 * 24)
//   );

//   if (daysSinceCreated >= 30) {
//     // Reset the count and update the updatedAt date
//     await prismadb.client.update({
//       where: { userId: userId },
//       data: { count: 0, updatedAt: new Date() },
//     });
//     return true;
//   } else if (userApiLimit.count < MAX_FREE_COUNTS) {
//     return true;
//   } else {
//     return false;
//   }
// };

export const getApiLimitCount = async () => {
  const { userId } = auth();

  if (!userId) {
    return 0;
  }

  const userApiLimit = await prismadb.client.findUnique({
    where: {
      userId,
    },
  });

  if (!userApiLimit) {
    return 0;
  }

  return userApiLimit.count;
};
