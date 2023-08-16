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

  const client = await prismadb.client.findFirst({
    where: {
      userId,
    },
  });

  if (client) {
    redirect(`/${client.id}`);
  }

  return <>{children}</>;
}
