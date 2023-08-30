"use client";
import { ModeToggle } from "@/components/mode-toggle";
import { cn } from "@/lib/utils";
import { UserButton } from "@clerk/nextjs";
import { Github } from "lucide-react";
import { Poppins } from "next/font/google";
import Link from "next/link";

const font = Poppins({ weight: "600", subsets: ["latin"] });

export const Navbar = ({}) => {
  return (
    <div className="fixed z-50 flex items-center justify-between w-full h-16 px-4 py-2 border-b border-primary/10 bg-secondary">
      <div className="flex items-center">
        <Link href="/">
          <h1
            className={cn(
              "block text-xl md:text-3xl font-bold text-primary",
              font.className
            )}
          >
            MindsDB Next.js Integration
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
        <a
          href="https://github.com/trace2798/mindsdb_fullstack"
          target="_blank"
          aria-label="github repo link"
        >
          <Github className="text-slate-500 hover:text-slate-900 dark:hover:text-slate-100" />
        </a>
        <ModeToggle />
        <UserButton afterSignOutUrl="/" />
      </div>
    </div>
  );
};
