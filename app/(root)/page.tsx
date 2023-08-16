import { FC } from "react";

interface pageProps {}

const page: FC<pageProps> = ({}) => {
  return (
    <>
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <div>Landing Page Unprotected route</div>
      </main>
    </>
  );
};

export default page;
