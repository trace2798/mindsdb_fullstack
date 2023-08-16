import { FC } from "react";
import ImageForm from "./components/image-form";

interface ImagePage {}

const ImagePage = async ({ params }: { params: { clientId: string } }) => {
  return (
    <>
      <ImageForm />
    </>
  );
};

export default ImagePage;
