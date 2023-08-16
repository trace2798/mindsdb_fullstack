"use client";
import Link from "next/link";
import { Poppins } from "next/font/google";
import { getApiLimitCount } from "@/lib/api-limit";
import { MobileSidebar } from "@/components/mobile-sidebar";
import { ModeToggle } from "@/components/mode-toggle";
import { cn } from "@/lib/utils";
import { UserButton } from "@clerk/nextjs";
// import { useProModal } from "@/hooks/use-pro-modal";

const font = Poppins({ weight: "600", subsets: ["latin"] });


export const Navbar = async ({}) => {

  // const apiLimitCount = await getApiLimitCount();
  return (
    <div className="fixed z-50 flex items-center justify-between w-full h-16 px-4 py-2 border-b border-primary/10 bg-secondary">
      <div className="flex items-center">
        {/* <MobileSidebar apiLimitCount={apiLimitCount} /> */}
        <Link href="/">
          <h1
            className={cn(
              "hidden md:block text-xl md:text-3xl font-bold text-primary",
              font.className
            )}
          >
            MindsDB
          </h1>
        </Link>
      </div>
      <div className="flex items-center gap-x-3">
        {/* {!isPro && (
          <Button onClick={proModal.onOpen} size="sm" variant="ghost">
            Upgrade
            <Sparkles className="w-4 h-4 ml-2 text-white fill-white" />
          </Button>
        )} */}
        <ModeToggle />
        <UserButton afterSignOutUrl="/" />
      </div>
    </div>
  );
};
