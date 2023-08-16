import NormalSummaryForm from "./components/normal-summary-form";

interface ImagePage {}

const NormalSummaryPage = async ({
  params,
}: {
  params: { clientId: string };
}) => {
  return (
    <>
      <NormalSummaryForm />
    </>
  );
};

export default NormalSummaryPage;
