import { Zap } from "lucide-react";
import { useEffect, useState } from "react";

import { MAX_FREE_COUNTS } from "@/constants";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
// import { useProModal } from "@/hooks/use-pro-modal";


export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

export const FreeCounter = ({
  apiLimitCount = 0,
}: {
  apiLimitCount: number;
}) => {
  const [mounted, setMounted] = useState(false);
  //   const proModal = useProModal();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div className="">
      <Card className="border-0 bg-white/10">
        <CardContent className="py-3">
          <div className="mb-2 space-y-2 text-sm text-center text-white">
            <p className="">
              {apiLimitCount} / {MAX_FREE_COUNTS} Free Generations
            </p>
            <Progress className="h-3" value={(apiLimitCount / MAX_FREE_COUNTS) * 100} />
          </div>
          {/* <Button onClick={proModal.onOpen} variant="default" className="w-full">
            Upgrade
            <Zap className="w-4 h-4 ml-2 fill-white" />
          </Button> */}
        </CardContent>
      </Card>
    </div>
  );
};
