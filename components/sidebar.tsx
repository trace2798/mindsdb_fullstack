"use client";

import { File, Home, Image, Plus, Settings } from "lucide-react";
import { useParams, usePathname, useRouter } from "next/navigation";

import { cn } from "@/lib/utils";
import { FreeCounter } from "./free-counter";
// import { useProModal } from "@/hooks/use-pro-modal";

interface SidebarProps {}

export const Sidebar = ({ apiLimitCount = 0 }: { apiLimitCount: number }) => {
  //   const proModal = useProModal();
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();

  const onNavigate = (url: string, pro: boolean) => {
    // if (pro && !isPro) {
    //   return proModal.onOpen();
    // }

    return router.push(url);
  };

  const routes = [
    {
      icon: Home,
      href: `/${params.clientId}`,
      label: "Dashboard",
      pro: false,
    },
    {
      icon: Image,
      href: `/${params.clientId}/images`,
      label: "Image",
      pro: false,
    },
    {
      icon: File,
      href: `/${params.clientId}/summarize`,
      label: "Comprehensive Summary",
      pro: true,
    },
    {
      icon: File,
      href: `/${params.clientId}/short-summary`,
      label: "Short Summary",
      pro: true,
    },
    {
      icon: Settings,
      href: "/settings",
      label: "Settings",
      pro: false,
    },
  ];

  return (
    <div className="flex flex-col h-full space-y-4 text-primary bg-secondary">
      <div className="flex justify-center flex-1 p-3">
        <div className="space-y-2">
          {routes.map((route) => (
            <div
              onClick={() => onNavigate(route.href, route.pro)}
              key={route.href}
              className={cn(
                "text-muted-foreground text-xs group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-primary hover:bg-primary/10 rounded-lg transition",
                pathname === route.href && "bg-primary/10 text-primary"
              )}
            >
              <div className="flex flex-col items-center flex-1 text-center gap-y-2">
                <route.icon className="w-5 h-5" />
                <h1 className="overflow-hidden w-fill">{route.label}</h1>
              </div>
            </div>
          ))}
        </div>
      </div>
      <FreeCounter apiLimitCount={apiLimitCount} />
    </div>
  );
};
