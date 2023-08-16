import ShortSummaryForm from "./components/short-summary-form";

interface ImagePage {}

const ShortSummaryPage = async ({
  params,
}: {
  params: { clientId: string };
}) => {
  return (
    <>
      <ShortSummaryForm />
    </>
  );
};

export default ShortSummaryPage;
