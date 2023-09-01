import { FC } from "react";
import { FeedbackForm } from "./_components/feedback-form";

interface pageProps {}

const page: FC<pageProps> = ({}) => {
  return (
    <>
      <div className="flex min-h-[90vh] flex-col items-center justify-center p-5">
        <FeedbackForm />
      </div>
    </>
  );
};

export default page;
