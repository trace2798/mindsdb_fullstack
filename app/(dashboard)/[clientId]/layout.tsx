import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs";

// import Navbar from "@/components/navbar";
import prismadb from "@/lib/prismadb";
import { Navbar } from "@/components/navbar";
import { Sidebar } from "@/components/sidebar";
import { getApiLimitCount } from "@/lib/api-limit";

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
  const apiLimitCount = await getApiLimitCount();
  return (
    <>
      <div className="h-full">
        <Navbar />
        <div className="fixed inset-y-0 flex-col hidden h-full max-w-[110px] mt-16 w-fill md:flex">
          <Sidebar apiLimitCount={apiLimitCount} />
        </div>
        {/* {children} */}
        <main className="h-full pt-16 md:pl-32">{children}</main>
      </div>
    </>
  );
}
