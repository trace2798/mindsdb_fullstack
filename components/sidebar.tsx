"use client";

import {
  DatabaseZap,
  File,
  Home,
  Image,
  MessageSquarePlusIcon
} from "lucide-react";
import { useParams, usePathname, useRouter } from "next/navigation";

import { cn } from "@/lib/utils";
import { FreeCounter } from "./free-counter";

export const Sidebar = ({ apiLimitCount = 0 }: { apiLimitCount: number }) => {
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();

  const onNavigate = (url: string, pro: boolean) => {
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
      href: `/${params.clientId}/summary-comprehensive`,
      label: "Comprehensive Summary",
      pro: true,
    },
    {
      icon: File,
      href: `/${params.clientId}/short-summary`,
      label: "Short Summary GPT-4",
      pro: true,
    },
    {
      icon: MessageSquarePlusIcon,
      href: `/${params.clientId}/chat`,
      label: "Ask GPT-4",
      pro: true,
    },
    {
      icon: MessageSquarePlusIcon,
      href: `/${params.clientId}/chat-turbo`,
      label: "Ask Turbo",
      pro: true,
    },
    {
      icon: DatabaseZap,
      href: `/${params.clientId}/feedback-analysis`,
      label: "Feedback Analysis",
      pro: true,
    },
  ];

  return (
    <>
      <div className="flex flex-col h-full space-y-4 overflow-hidden text-primary bg-secondary">
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
            <FreeCounter apiLimitCount={apiLimitCount} />
          </div>
        </div>
      </div>
    </>
  );
};
