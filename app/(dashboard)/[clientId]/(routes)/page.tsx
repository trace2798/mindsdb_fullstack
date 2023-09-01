import { getAskCount } from "@/actions/get-ask-count";
import { getAskTurboCount } from "@/actions/get-ask-turbo-count";
import { getNormalSummaryCount } from "@/actions/get-comsum-count";
import { getImageCount } from "@/actions/get-image-count";
import { getShortSummaryCount } from "@/actions/get-short-summary-count";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Image } from "lucide-react";

interface DashboardPageProps {
  params: {
    clientId: string;
  };
}

const DashboardPage: React.FC<DashboardPageProps> = async ({ params }) => {
  const images = await getImageCount(params.clientId);
  const normalSummary = await getNormalSummaryCount(params.clientId);
  const shortSummary = await getShortSummaryCount(params.clientId);
  const askCount = await getAskCount(params.clientId);
  const askTurboCount = await getAskTurboCount(params.clientId);
  return (
    <>
      <main className="grid gap-4 p-24 mt-8 overflow-hidden lg:grid-cols-2 xl:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">
              Total Images Generated
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-center">{images}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">
              Total Comprehensive Summary Generated
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-center">
              {normalSummary}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">
              Total Short Summary Generated
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-center">{shortSummary}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">
              Total question answered by gpt-4
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-center">{askCount}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">
              Total question answered by turbo
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-center">
              {askTurboCount}
            </div>
          </CardContent>
        </Card>
      </main>
    </>
  );
};

export default DashboardPage;
