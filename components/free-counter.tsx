import { useEffect, useState } from "react";

import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { MAX_FREE_COUNTS } from "@/constants";


export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

export const FreeCounter = ({
  apiLimitCount = 0,
}: {
  apiLimitCount: number;
}) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div className="">
      <Card className="border-0 bg-white/10 ">
        <CardContent className="py-3">
          <div className="mb-2 space-y-2 text-sm text-center text-muted-foreground">
            <p className="">
              {apiLimitCount} / {MAX_FREE_COUNTS} Free Generations
            </p>
            <Progress
              className="h-3"
              value={(apiLimitCount / MAX_FREE_COUNTS) * 100}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
