import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs";

import prismadb from "@/lib/prismadb";

export default async function SetupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userId } = auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const user = await prismadb.user.findFirst({
    where: {
      userId,
    },
  });

  if (user) {
    redirect(`/${user.id}`);
  }

  return <>{children}</>;
}
