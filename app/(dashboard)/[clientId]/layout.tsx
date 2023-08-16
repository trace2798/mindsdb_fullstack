import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs";

// import Navbar from "@/components/navbar";
import prismadb from "@/lib/prismadb";

export default async function DashboardLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { clientId: string };
}) {
  const { userId } = auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const user = await prismadb.client.findFirst({
    where: {
      id: params.clientId,
      userId,
    },
  });

  if (!user) {
    redirect("/create-client");
  }

  return (
    <>
      {/* <Navbar /> */}
      {children}
    </>
  );
}
