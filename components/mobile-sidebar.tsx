import { Menu } from "lucide-react";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Sidebar } from "@/components/sidebar";

export const MobileSidebar = ({
  apiLimitCount = 0,
}: {
  apiLimitCount: number;
}) => {
  return (
    <Sheet>
      <SheetTrigger className="pr-4 md:hidden">
        <div className="flex">
          <Menu className="mr-1" /> Menu
        </div>
      </SheetTrigger>
      <SheetContent side="left" className="w-32 p-0 pt-10 bg-secondary">
        <Sidebar apiLimitCount={apiLimitCount} />
      </SheetContent>
    </Sheet>
  );
};
