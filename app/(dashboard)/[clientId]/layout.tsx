import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs";
import prismadb from "@/lib/prismadb";
import { Navbar } from "@/components/navbar";
import { Sidebar } from "@/components/sidebar";
import { getApiLimitCount } from "@/lib/api-limit";
import { MobileSidebar } from "@/components/mobile-sidebar";

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
        <div className="fixed inset-y-0 flex-col flex h-full max-w-[110px] mt-16 w-fill md:hidden">
          <MobileSidebar apiLimitCount={apiLimitCount} />
        </div>
        <div className="fixed inset-y-0 flex-col hidden h-full max-w-[110px] mt-16 w-fill md:flex">
          <Sidebar apiLimitCount={apiLimitCount} />
        </div>
        <main className="h-full pt-16 mx-[2vw] md:pl-32 md:mr-[4vw]">
          {children}
        </main>
      </div>
    </>
  );
}
